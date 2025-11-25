'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export function generateStaticParams() {
  return []
}
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Icon,
  Flex,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { FiArrowLeft, FiFileText, FiAlertTriangle, FiCheckCircle, FiDownload } from 'react-icons/fi'
import { getCurrentCase, setCurrentCase, DOMAINS } from '@/lib/mockData'
import { AuditCase } from '@/types'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { getComplianceDistribution, getRisksBySeverity } from '@/lib/auditLogic'

const COLORS = {
  compliant: '#48BB78',
  partial: '#ECC94B',
  nonCompliant: '#F56565',
  notAssessed: '#CBD5E0'
}

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const [auditCase, setAuditCase] = useState<AuditCase | null>(null)

  useEffect(() => {
    if (params.id) {
      setCurrentCase(params.id as string)
      setAuditCase(getCurrentCase())
    }
  }, [params.id])

  if (!auditCase) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    )
  }

  const complianceData = getComplianceDistribution(auditCase.id)
  const riskData = getRisksBySeverity(auditCase.id)

  const pieData = [
    { name: 'Compliant', value: complianceData.compliant, color: COLORS.compliant },
    { name: 'Partial', value: complianceData.partial, color: COLORS.partial },
    { name: 'Non-Compliant', value: complianceData.nonCompliant, color: COLORS.nonCompliant },
    { name: 'Not Assessed', value: complianceData.notAssessed, color: COLORS.notAssessed },
  ]

  const domainScoreData = auditCase.domains.map(d => ({
    name: d.name.split(' ').slice(0, 2).join(' '),
    score: Math.round((d.score / d.maxScore) * 100) || 0,
    fullName: d.name
  }))

  const radarData = auditCase.domains.map(d => ({
    domain: d.name.split(' ').slice(0, 2).join(' '),
    score: Math.round((d.score / d.maxScore) * 100) || 0,
  }))

  const overallPercentage = Math.round((auditCase.overallScore / auditCase.maxScore) * 100)

  const benchmarkData = [
    { framework: 'ISO 27001', score: overallPercentage, maxScore: 100 },
    { framework: 'NIST CSF', score: Math.max(0, overallPercentage - 5), maxScore: 100 },
    { framework: 'CIS Controls', score: Math.max(0, overallPercentage - 8), maxScore: 100 },
    { framework: 'NIST 800-53', score: Math.max(0, overallPercentage - 10), maxScore: 100 },
    { framework: 'CMMC', score: Math.max(0, overallPercentage - 12), maxScore: 100 },
  ]

  const exportPDF = () => {
    alert('PDF Export: This will generate a comprehensive audit report with all findings, charts, and recommendations.')
  }

  const exportExcel = () => {
    alert('Excel Export: This will export detailed audit data including all questions, answers, scores, and risks.')
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="blue.600" color="white" py={6} px={8} boxShadow="md">
        <Container maxW="container.xl">
          <Flex align="center" gap={4}>
            <Button
              leftIcon={<Icon as={FiArrowLeft} />}
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.700' }}
              onClick={() => router.push('/')}
            >
              Back
            </Button>
            <VStack align="start" spacing={0} flex={1}>
              <Heading size="lg">{auditCase.clientInfo.companyName}</Heading>
              <Text mt={1}>{auditCase.metadata.auditType}</Text>
            </VStack>
            <Badge colorScheme={auditCase.status === 'Completed' ? 'green' : 'blue'} fontSize="md" px={3} py={1}>
              {auditCase.status}
            </Badge>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Tabs colorScheme="blue">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Domains</Tab>
            <Tab>Risks</Tab>
            <Tab>Benchmarking</Tab>
            <Tab>Reports</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                {/* Key Metrics */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Overall Score</StatLabel>
                        <StatNumber fontSize="3xl" color="blue.600">
                          {overallPercentage}%
                        </StatNumber>
                        <StatHelpText>
                          {auditCase.overallScore} / {auditCase.maxScore} points
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Total Risks</StatLabel>
                        <StatNumber fontSize="3xl" color="red.600">
                          {auditCase.risks.filter(r => r.status === 'Open').length}
                        </StatNumber>
                        <StatHelpText>
                          {riskData.critical} Critical, {riskData.high} High
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Completion</StatLabel>
                        <StatNumber fontSize="3xl" color="green.600">
                          {Math.round((Object.keys(auditCase.answers).length / DOMAINS.reduce((sum, d) => sum + d.totalQuestions, 0)) * 100)}%
                        </StatNumber>
                        <StatHelpText>
                          {Object.keys(auditCase.answers).length} / {DOMAINS.reduce((sum, d) => sum + d.totalQuestions, 0)} questions
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Domains Assessed</StatLabel>
                        <StatNumber fontSize="3xl" color="purple.600">
                          {auditCase.domains.filter(d => d.status !== 'Not Started').length}
                        </StatNumber>
                        <StatHelpText>
                          of {auditCase.domains.length} domains
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                {/* Charts */}
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Compliance Distribution</Heading>
                    </CardHeader>
                    <CardBody>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Domain Scores</Heading>
                    </CardHeader>
                    <CardBody>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={domainScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                          <YAxis domain={[0, 100]} />
                          <Tooltip content={({ payload }) => {
                            if (payload && payload[0]) {
                              return (
                                <Box bg="white" p={2} border="1px" borderColor="gray.200" borderRadius="md">
                                  <Text fontWeight="bold">{payload[0].payload.fullName}</Text>
                                  <Text>Score: {payload[0].value}%</Text>
                                </Box>
                              )
                            }
                            return null
                          }} />
                          <Bar dataKey="score" fill="#3182CE" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                {/* Radar Chart */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Security Posture Radar</Heading>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="domain" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Score" dataKey="score" stroke="#3182CE" fill="#3182CE" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Domains Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {auditCase.domains.map((domain) => {
                  const domainPercentage = domain.maxScore > 0 
                    ? Math.round((domain.score / domain.maxScore) * 100)
                    : 0
                  const statusColor = 
                    domain.status === 'Completed' ? 'green' :
                    domain.status === 'In Progress' ? 'blue' : 'gray'

                  return (
                    <Card
                      key={domain.id}
                      cursor="pointer"
                      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                      transition="all 0.2s"
                      onClick={() => router.push(`/assessment/${auditCase.id}/${domain.id}`)}
                    >
                      <CardBody>
                        <VStack align="start" spacing={3}>
                          <Flex justify="space-between" w="full">
                            <Badge colorScheme={statusColor}>
                              {domain.status}
                            </Badge>
                            <Text fontSize="sm" color="gray.500">
                              Domain {domain.id}
                            </Text>
                          </Flex>

                          <Heading size="sm">{domain.name}</Heading>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {domain.description}
                          </Text>

                          <Box w="full">
                            <Flex justify="space-between" fontSize="sm" mb={1}>
                              <Text>Progress</Text>
                              <Text fontWeight="bold" color="blue.600">
                                {domain.completedQuestions} / {domain.totalQuestions}
                              </Text>
                            </Flex>
                            <Progress
                              value={(domain.completedQuestions / domain.totalQuestions) * 100}
                              colorScheme="blue"
                              size="sm"
                              borderRadius="full"
                            />
                          </Box>

                          <Box w="full">
                            <Flex justify="space-between" fontSize="sm" mb={1}>
                              <Text>Score</Text>
                              <Text fontWeight="bold" color="green.600">
                                {domainPercentage}%
                              </Text>
                            </Flex>
                            <Progress
                              value={domainPercentage}
                              colorScheme="green"
                              size="sm"
                              borderRadius="full"
                            />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  )
                })}
              </SimpleGrid>
            </TabPanel>

            {/* Risks Tab */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Heading size="md">Consolidated Risk Overview</Heading>
                      <Text color="gray.600" fontSize="sm">
                        {auditCase.risks.filter(r => r.status === 'Open').length} open risks identified
                      </Text>
                    </VStack>
                    <SimpleGrid columns={4} spacing={4}>
                      <Stat size="sm">
                        <StatLabel fontSize="xs">Critical</StatLabel>
                        <StatNumber color="red.600">{riskData.critical}</StatNumber>
                      </Stat>
                      <Stat size="sm">
                        <StatLabel fontSize="xs">High</StatLabel>
                        <StatNumber color="orange.600">{riskData.high}</StatNumber>
                      </Stat>
                      <Stat size="sm">
                        <StatLabel fontSize="xs">Medium</StatLabel>
                        <StatNumber color="yellow.600">{riskData.medium}</StatNumber>
                      </Stat>
                      <Stat size="sm">
                        <StatLabel fontSize="xs">Low</StatLabel>
                        <StatNumber color="blue.600">{riskData.low}</StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </Flex>
                </CardHeader>
                <CardBody>
                  {auditCase.risks.length === 0 ? (
                    <Flex direction="column" align="center" py={12}>
                      <Icon as={FiCheckCircle} boxSize={16} color="green.400" />
                      <Heading size="md" color="gray.600" mt={4}>
                        No Risks Identified
                      </Heading>
                      <Text color="gray.500" mt={2}>
                        Complete the assessment to identify potential risks
                      </Text>
                    </Flex>
                  ) : (
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Severity</Th>
                          <Th>Domain</Th>
                          <Th>Description</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {auditCase.risks
                          .sort((a, b) => {
                            const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
                            return severityOrder[a.severity] - severityOrder[b.severity]
                          })
                          .map((risk) => {
                            const domain = auditCase.domains.find(d => d.id === risk.domainId)
                            const severityColor = 
                              risk.severity === 'Critical' ? 'red' :
                              risk.severity === 'High' ? 'orange' :
                              risk.severity === 'Medium' ? 'yellow' : 'blue'

                            return (
                              <Tr key={risk.id}>
                                <Td>
                                  <Badge colorScheme={severityColor}>
                                    {risk.severity}
                                  </Badge>
                                </Td>
                                <Td>{domain?.name}</Td>
                                <Td>{risk.description}</Td>
                                <Td>
                                  <Badge colorScheme={risk.status === 'Closed' ? 'green' : 'orange'}>
                                    {risk.status}
                                  </Badge>
                                </Td>
                              </Tr>
                            )
                          })}
                      </Tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Benchmarking Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Card>
                  <CardHeader>
                    <Heading size="md">Framework Benchmarking</Heading>
                    <Text color="gray.600" fontSize="sm" mt={1}>
                      Compliance alignment with major security frameworks
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      {benchmarkData.map((framework) => (
                        <Box key={framework.framework} w="full">
                          <Flex justify="space-between" mb={2}>
                            <Text fontWeight="medium">{framework.framework}</Text>
                            <Text fontWeight="bold" color="blue.600">
                              {framework.score}%
                            </Text>
                          </Flex>
                          <Progress
                            value={framework.score}
                            colorScheme="blue"
                            size="lg"
                            borderRadius="full"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <Heading size="md">Framework Comparison</Heading>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={benchmarkData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="framework" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#3182CE" name="Alignment Score (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Reports Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Card>
                  <CardHeader>
                    <Heading size="md">Export Reports</Heading>
                    <Text color="gray.600" fontSize="sm" mt={1}>
                      Generate comprehensive audit reports
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Box p={4} borderWidth={1} borderRadius="md">
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={1}>
                            <Heading size="sm">PDF Report</Heading>
                            <Text fontSize="sm" color="gray.600">
                              Executive summary with charts, findings, and recommendations
                            </Text>
                          </VStack>
                          <Button
                            leftIcon={<Icon as={FiDownload} />}
                            colorScheme="red"
                            onClick={exportPDF}
                          >
                            Export PDF
                          </Button>
                        </Flex>
                      </Box>

                      <Box p={4} borderWidth={1} borderRadius="md">
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={1}>
                            <Heading size="sm">Excel Export</Heading>
                            <Text fontSize="sm" color="gray.600">
                              Detailed data with all questions, answers, scores, and risks
                            </Text>
                          </VStack>
                          <Button
                            leftIcon={<Icon as={FiDownload} />}
                            colorScheme="green"
                            onClick={exportExcel}
                          >
                            Export Excel
                          </Button>
                        </Flex>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <Heading size="md">Client Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Company Name</Text>
                        <Text>{auditCase.clientInfo.companyName}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Industry</Text>
                        <Text>{auditCase.clientInfo.industry}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Contact Name</Text>
                        <Text>{auditCase.clientInfo.contactName}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Email</Text>
                        <Text>{auditCase.clientInfo.emailAddress}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Phone</Text>
                        <Text>{auditCase.clientInfo.phoneNumber}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Address</Text>
                        <Text>{auditCase.clientInfo.address}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Auditor</Text>
                        <Text>{auditCase.metadata.auditor.name}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Commencement Date</Text>
                        <Text>{new Date(auditCase.metadata.commencementDate).toLocaleDateString()}</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}

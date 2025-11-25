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
  Card,
  CardBody,
  CardHeader,
  Badge,
  Icon,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Progress,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { FiArrowLeft, FiSave, FiWifi, FiAlertTriangle } from 'react-icons/fi'
import { getCurrentCase, setCurrentCase, getQuestionsByDomain } from '@/lib/mockData'
import { AuditCase, Question, Answer } from '@/types'
import { saveAnswer, getComplianceDistribution, getRisksBySeverity } from '@/lib/auditLogic'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = {
  compliant: '#48BB78',
  partial: '#ECC94B',
  nonCompliant: '#F56565',
  notAssessed: '#CBD5E0'
}

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const toast = useToast()
  const { isOpen: isScanOpen, onOpen: onScanOpen, onClose: onScanClose } = useDisclosure()
  
  const [auditCase, setAuditCase] = useState<AuditCase | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [comments, setComments] = useState<Record<string, string>>({})
  const [scanScope, setScanScope] = useState('')
  const [scanStatus, setScanStatus] = useState<'idle' | 'running' | 'completed'>('idle')
  const [scanProgress, setScanProgress] = useState(0)
  const [scanPhase, setScanPhase] = useState('')
  const [scanResults, setScanResults] = useState<any>(null)

  const domainId = parseInt(params.domainId as string)

  useEffect(() => {
    if (params.id) {
      setCurrentCase(params.id as string)
      const currentCase = getCurrentCase()
      setAuditCase(currentCase)
      
      if (currentCase) {
        const domainQuestions = getQuestionsByDomain(domainId)
        setQuestions(domainQuestions)
        setAnswers(currentCase.answers)
      }
    }
  }, [params.id, domainId])

  const handleAnswerChange = (questionId: string, optionId: string, score: number, maxScore: number) => {
    const newAnswer: Answer = {
      questionId,
      selectedOptionIds: [optionId],
      score,
      freeText: '',
      comment: comments[questionId] || '',
      timestamp: new Date()
    }

    setAnswers({ ...answers, [questionId]: newAnswer })
    
    if (auditCase) {
      saveAnswer(auditCase.id, questionId, newAnswer)
      setAuditCase(getCurrentCase())
      
      toast({
        title: 'Answer Saved',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleCommentChange = (questionId: string, comment: string) => {
    setComments({ ...comments, [questionId]: comment })
    
    if (answers[questionId] && auditCase) {
      const updatedAnswer = { ...answers[questionId], comment }
      saveAnswer(auditCase.id, questionId, updatedAnswer)
    }
  }

  const startNetworkScan = () => {
    if (!scanScope.trim()) {
      toast({
        title: 'Scan Scope Required',
        description: 'Please enter an IP range or hostname',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setScanStatus('running')
    setScanProgress(0)
    setScanPhase('Initializing scan...')
    onScanClose()

    // Simulate scanning process
    const phases = [
      { progress: 10, phase: 'Discovering hosts...' },
      { progress: 30, phase: 'Scanning ports on 192.168.1.1...' },
      { progress: 45, phase: 'Scanning ports on 192.168.1.10...' },
      { progress: 60, phase: 'Identifying services...' },
      { progress: 75, phase: 'Detecting vulnerabilities...' },
      { progress: 90, phase: 'Analyzing results...' },
      { progress: 100, phase: 'Scan completed' },
    ]

    let currentPhaseIndex = 0
    const interval = setInterval(() => {
      if (currentPhaseIndex < phases.length) {
        setScanProgress(phases[currentPhaseIndex].progress)
        setScanPhase(phases[currentPhaseIndex].phase)
        currentPhaseIndex++
      } else {
        clearInterval(interval)
        setScanStatus('completed')
        
        // Mock scan results
        setScanResults({
          hostsFound: 5,
          openPorts: 23,
          vulnerabilities: {
            critical: 2,
            high: 5,
            medium: 8,
            low: 3
          },
          hosts: [
            { ip: '192.168.1.1', hostname: 'gateway.local', openPorts: 5, vulns: 3 },
            { ip: '192.168.1.10', hostname: 'server1.local', openPorts: 8, vulns: 7 },
            { ip: '192.168.1.15', hostname: 'server2.local', openPorts: 6, vulns: 5 },
            { ip: '192.168.1.20', hostname: 'workstation1.local', openPorts: 2, vulns: 2 },
            { ip: '192.168.1.25', hostname: 'workstation2.local', openPorts: 2, vulns: 1 },
          ]
        })

        toast({
          title: 'Scan Completed',
          description: 'Network scan has been completed successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    }, 1500)
  }

  if (!auditCase) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    )
  }

  const domain = auditCase.domains.find(d => d.id === domainId)
  if (!domain) {
    return <Text>Domain not found</Text>
  }

  const complianceData = getComplianceDistribution(auditCase.id, domainId)
  const riskData = getRisksBySeverity(auditCase.id, domainId)
  const domainRisks = auditCase.risks.filter(r => r.domainId === domainId && r.status === 'Open')

  const pieData = [
    { name: 'Compliant', value: complianceData.compliant, color: COLORS.compliant },
    { name: 'Partial', value: complianceData.partial, color: COLORS.partial },
    { name: 'Non-Compliant', value: complianceData.nonCompliant, color: COLORS.nonCompliant },
    { name: 'Not Assessed', value: complianceData.notAssessed, color: COLORS.notAssessed },
  ]

  const barData = [
    { name: 'Compliant', value: complianceData.compliant, fill: COLORS.compliant },
    { name: 'Partial', value: complianceData.partial, fill: COLORS.partial },
    { name: 'Non-Compliant', value: complianceData.nonCompliant, fill: COLORS.nonCompliant },
    { name: 'Not Assessed', value: complianceData.notAssessed, fill: COLORS.notAssessed },
  ]

  const groupedQuestions: Record<string, Question[]> = {}
  questions.forEach(q => {
    const category = q.category || 'General'
    if (!groupedQuestions[category]) {
      groupedQuestions[category] = []
    }
    groupedQuestions[category].push(q)
  })

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
              onClick={() => router.push(`/dashboard/${auditCase.id}`)}
            >
              Back
            </Button>
            <VStack align="start" spacing={0} flex={1}>
              <Heading size="lg">Domain {domain.id}: {domain.name}</Heading>
              <Text mt={1}>{domain.description}</Text>
            </VStack>
            {domainId === 3 && (
              <Button
                leftIcon={<Icon as={FiWifi} />}
                colorScheme="teal"
                onClick={onScanOpen}
                isDisabled={scanStatus === 'running'}
              >
                {scanStatus === 'running' ? 'Scanning...' : 'Network Scan'}
              </Button>
            )}
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={6}>
          {/* Progress Card */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Progress</StatLabel>
                <StatNumber fontSize="2xl">
                  {domain.completedQuestions} / {domain.totalQuestions}
                </StatNumber>
                <Box mt={2}>
                  <Progress
                    value={(domain.completedQuestions / domain.totalQuestions) * 100}
                    colorScheme="blue"
                    size="sm"
                    borderRadius="full"
                  />
                </Box>
              </Stat>
            </CardBody>
          </Card>

          {/* Score Card */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Domain Score</StatLabel>
                <StatNumber fontSize="2xl" color="green.600">
                  {Math.round((domain.score / domain.maxScore) * 100)}%
                </StatNumber>
                <Box mt={2}>
                  <Progress
                    value={(domain.score / domain.maxScore) * 100}
                    colorScheme="green"
                    size="sm"
                    borderRadius="full"
                  />
                </Box>
              </Stat>
            </CardBody>
          </Card>

          {/* Risks Card */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Open Risks</StatLabel>
                <StatNumber fontSize="2xl" color="red.600">
                  {domainRisks.length}
                </StatNumber>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  {riskData.critical} Critical, {riskData.high} High
                </Text>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Network Scan Progress */}
        {domainId === 3 && scanStatus === 'running' && (
          <Card mb={6} borderColor="teal.500" borderWidth={2}>
            <CardBody>
              <VStack spacing={4}>
                <Flex w="full" justify="space-between" align="center">
                  <Heading size="md">Network Scan in Progress</Heading>
                  <Badge colorScheme="teal" fontSize="lg">{scanProgress}%</Badge>
                </Flex>
                <Progress value={scanProgress} size="lg" colorScheme="teal" w="full" />
                <Text color="gray.600">{scanPhase}</Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Scan Results */}
        {domainId === 3 && scanStatus === 'completed' && scanResults && (
          <Card mb={6} borderColor="green.500" borderWidth={2}>
            <CardHeader bg="green.50">
              <Heading size="md">Scan Results</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  <Stat size="sm">
                    <StatLabel>Hosts Found</StatLabel>
                    <StatNumber>{scanResults.hostsFound}</StatNumber>
                  </Stat>
                  <Stat size="sm">
                    <StatLabel>Open Ports</StatLabel>
                    <StatNumber>{scanResults.openPorts}</StatNumber>
                  </Stat>
                  <Stat size="sm">
                    <StatLabel>Vulnerabilities</StatLabel>
                    <StatNumber color="red.600">
                      {(Object.values(scanResults.vulnerabilities) as number[]).reduce((a, b) => a + b, 0)}
                    </StatNumber>
                  </Stat>
                  <Stat size="sm">
                    <StatLabel>Critical</StatLabel>
                    <StatNumber color="red.600">{scanResults.vulnerabilities.critical}</StatNumber>
                  </Stat>
                </SimpleGrid>

                <Box>
                  <Heading size="sm" mb={3}>Discovered Hosts</Heading>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>IP Address</Th>
                        <Th>Hostname</Th>
                        <Th isNumeric>Open Ports</Th>
                        <Th isNumeric>Vulnerabilities</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {scanResults.hosts.map((host: any) => (
                        <Tr key={host.ip}>
                          <Td>{host.ip}</Td>
                          <Td>{host.hostname}</Td>
                          <Td isNumeric>{host.openPorts}</Td>
                          <Td isNumeric>
                            <Badge colorScheme={host.vulns > 5 ? 'red' : host.vulns > 2 ? 'orange' : 'yellow'}>
                              {host.vulns}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        )}

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={6}>
          {/* Compliance Chart */}
          <Card>
            <CardHeader>
              <Heading size="sm">Compliance Status</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => value > 0 ? value : ''}
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

          {/* Bar Chart */}
          <Card gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <CardHeader>
              <Heading size="sm">Question Distribution</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Risks Section */}
        {domainRisks.length > 0 && (
          <Card mb={6} borderColor="red.300" borderWidth={1}>
            <CardHeader bg="red.50">
              <Flex align="center" gap={2}>
                <Icon as={FiAlertTriangle} color="red.600" />
                <Heading size="md">Domain Risks ({domainRisks.length})</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                {domainRisks.map((risk) => (
                  <Box key={risk.id} p={3} borderWidth={1} borderRadius="md" borderColor="gray.200">
                    <Flex justify="space-between" align="start" mb={2}>
                      <Badge colorScheme={
                        risk.severity === 'Critical' ? 'red' :
                        risk.severity === 'High' ? 'orange' :
                        risk.severity === 'Medium' ? 'yellow' : 'blue'
                      }>
                        {risk.severity}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(risk.createdAt).toLocaleDateString()}
                      </Text>
                    </Flex>
                    <Text fontWeight="medium">{risk.description}</Text>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Questions */}
        <Card>
          <CardHeader>
            <Heading size="md">Assessment Questions</Heading>
          </CardHeader>
          <CardBody>
            <Accordion allowMultiple defaultIndex={[0]}>
              {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
                <AccordionItem key={category}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading size="sm">{category}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {categoryQuestions.filter(q => answers[q.id]).length} / {categoryQuestions.length} answered
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack spacing={6} align="stretch">
                      {categoryQuestions.map((question, index) => (
                        <Box key={question.id} p={4} borderWidth={1} borderRadius="md" bg="white">
                          <VStack align="stretch" spacing={3}>
                            <Flex gap={3}>
                              <Badge colorScheme="blue">{index + 1}</Badge>
                              <Text fontWeight="medium" flex={1}>{question.text}</Text>
                            </Flex>

                            {question.type === 'single-select' && question.options && (
                              <RadioGroup
                                value={answers[question.id]?.selectedOptionIds[0] || ''}
                                onChange={(optionId) => {
                                  const option = question.options?.find(o => o.id === optionId)
                                  if (option) {
                                    handleAnswerChange(question.id, optionId, option.score, question.maxScore)
                                  }
                                }}
                              >
                                <Stack spacing={2}>
                                  {question.options.map((option) => (
                                    <Radio key={option.id} value={option.id}>
                                      {option.label}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            )}

                            <FormControl>
                              <FormLabel fontSize="sm">Comments / Evidence</FormLabel>
                              <Textarea
                                value={comments[question.id] || answers[question.id]?.comment || ''}
                                onChange={(e) => handleCommentChange(question.id, e.target.value)}
                                placeholder="Add any relevant comments or evidence..."
                                size="sm"
                              />
                            </FormControl>

                            {answers[question.id] && (
                              <Flex justify="space-between" align="center" pt={2} borderTopWidth={1}>
                                <Text fontSize="sm" color="gray.600">
                                  Score: {answers[question.id].score} / {question.maxScore}
                                </Text>
                                <Badge colorScheme="green">Answered</Badge>
                              </Flex>
                            )}
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      </Container>

      {/* Network Scan Modal */}
      <Modal isOpen={isScanOpen} onClose={onScanClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configure Network Scan</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Scan Scope</FormLabel>
                <Input
                  value={scanScope}
                  onChange={(e) => setScanScope(e.target.value)}
                  placeholder="192.168.1.0/24 or hostname"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Enter IP range in CIDR notation or hostname
                </Text>
              </FormControl>

              <Button colorScheme="teal" w="full" onClick={startNetworkScan}>
                Start Scan
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

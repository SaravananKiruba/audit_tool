'use client'

import { Box, Container, Heading, Text, Button, VStack, SimpleGrid, Card, CardBody, Badge, Icon, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { getAllCases } from '@/lib/mockData'
import { useState, useEffect } from 'react'
import { AuditCase } from '@/types'
import { FiPlus, FiFileText, FiClock } from 'react-icons/fi'

export default function Home() {
  const router = useRouter()
  const [cases, setCases] = useState<AuditCase[]>([])

  useEffect(() => {
    setCases(getAllCases())
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'green'
      case 'In Progress': return 'blue'
      case 'Open': return 'orange'
      default: return 'gray'
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="blue.600" color="white" py={6} px={8} boxShadow="md">
        <Container maxW="container.xl">
          <Heading size="lg">Security Audit Tool</Heading>
          <Text mt={2}>Comprehensive Security Audit & Compliance Management</Text>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <VStack align="start" spacing={1}>
            <Heading size="md">Audit Cases</Heading>
            <Text color="gray.600">Manage and track all audit cases</Text>
          </VStack>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="blue"
            size="lg"
            onClick={() => router.push('/create-audit')}
          >
            New Audit Case
          </Button>
        </Flex>

        {cases.length === 0 ? (
          <Card>
            <CardBody>
              <VStack spacing={4} py={12}>
                <Icon as={FiFileText} boxSize={16} color="gray.400" />
                <Heading size="md" color="gray.600">No Audit Cases Yet</Heading>
                <Text color="gray.500">Create your first audit case to get started</Text>
                <Button
                  leftIcon={<Icon as={FiPlus} />}
                  colorScheme="blue"
                  onClick={() => router.push('/create-audit')}
                >
                  Create New Audit Case
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {cases.map((auditCase) => (
              <Card
                key={auditCase.id}
                cursor="pointer"
                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                onClick={() => router.push(`/dashboard/${auditCase.id}`)}
              >
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Flex justify="space-between" w="full">
                      <Badge colorScheme={getStatusColor(auditCase.status)} fontSize="sm">
                        {auditCase.status}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {auditCase.id}
                      </Text>
                    </Flex>
                    
                    <Heading size="sm">{auditCase.clientInfo.companyName}</Heading>
                    
                    <VStack align="start" spacing={1} w="full">
                      <Text fontSize="sm" color="gray.600">
                        <strong>Industry:</strong> {auditCase.clientInfo.industry}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        <strong>Type:</strong> {auditCase.metadata.auditType}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        <strong>Contact:</strong> {auditCase.clientInfo.contactName}
                      </Text>
                    </VStack>

                    <Flex align="center" gap={2} fontSize="sm" color="gray.500">
                      <Icon as={FiClock} />
                      <Text>
                        Created: {new Date(auditCase.createdAt).toLocaleDateString()}
                      </Text>
                    </Flex>

                    <Box w="full" pt={2}>
                      <Flex justify="space-between" fontSize="sm" mb={1}>
                        <Text fontWeight="medium">Overall Progress</Text>
                        <Text color="blue.600" fontWeight="bold">
                          {Math.round((auditCase.overallScore / auditCase.maxScore) * 100)}%
                        </Text>
                      </Flex>
                      <Box w="full" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
                        <Box
                          h="full"
                          bg="blue.500"
                          w={`${(auditCase.overallScore / auditCase.maxScore) * 100}%`}
                          transition="width 0.3s"
                        />
                      </Box>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}

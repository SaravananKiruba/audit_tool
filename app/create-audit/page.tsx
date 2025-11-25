'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Card,
  CardBody,
  CardHeader,
  useToast,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createAuditCase, AUDIT_TYPES } from '@/lib/mockData'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

export default function CreateAuditPage() {
  const router = useRouter()
  const toast = useToast()

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    contactName: '',
    auditType: AUDIT_TYPES[0],
    auditorName: 'John Doe',
    auditorEmail: 'john.doe@audit.com',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required'
    
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid email format'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const newCase = createAuditCase(
      {
        companyName: formData.companyName,
        industry: formData.industry,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        contactName: formData.contactName,
      },
      {
        auditType: formData.auditType,
        auditor: {
          name: formData.auditorName,
          email: formData.auditorEmail,
        },
      }
    )

    toast({
      title: 'Audit Case Created',
      description: `Case ${newCase.id} has been created successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    router.push(`/dashboard/${newCase.id}`)
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
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
            <VStack align="start" spacing={0}>
              <Heading size="lg">Create New Audit Case</Heading>
              <Text mt={1}>Enter client and audit information</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Client Information */}
          <Card>
            <CardHeader bg="gray.50">
              <Heading size="md">Client Information</Heading>
              <Text color="gray.600" fontSize="sm" mt={1}>
                All fields are mandatory
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.companyName}>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.companyName}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.industry}>
                  <FormLabel>Industry</FormLabel>
                  <Input
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder="E.g., Healthcare, Finance, Technology"
                  />
                  {errors.industry && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.industry}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.address}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Enter company address"
                  />
                  {errors.address && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.address}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phoneNumber && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.emailAddress}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleChange('emailAddress', e.target.value)}
                    placeholder="contact@company.com"
                  />
                  {errors.emailAddress && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.emailAddress}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.contactName}>
                  <FormLabel>Client Contact Name</FormLabel>
                  <Input
                    value={formData.contactName}
                    onChange={(e) => handleChange('contactName', e.target.value)}
                    placeholder="Enter primary contact name"
                  />
                  {errors.contactName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.contactName}
                    </Text>
                  )}
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Audit Metadata */}
          <Card>
            <CardHeader bg="gray.50">
              <Heading size="md">Audit Metadata</Heading>
              <Text color="gray.600" fontSize="sm" mt={1}>
                Specify audit type and auditor details
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Audit Type</FormLabel>
                  <Select
                    value={formData.auditType}
                    onChange={(e) => handleChange('auditType', e.target.value)}
                  >
                    {AUDIT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Auditor Name</FormLabel>
                  <Input
                    value={formData.auditorName}
                    onChange={(e) => handleChange('auditorName', e.target.value)}
                    placeholder="Enter auditor name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Auditor Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.auditorEmail}
                    onChange={(e) => handleChange('auditorEmail', e.target.value)}
                    placeholder="auditor@company.com"
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Actions */}
          <Flex justify="flex-end" gap={4}>
            <Button variant="outline" onClick={() => router.push('/')}>
              Cancel
            </Button>
            <Button
              leftIcon={<Icon as={FiSave} />}
              colorScheme="blue"
              size="lg"
              onClick={handleSubmit}
            >
              Create Audit Case
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

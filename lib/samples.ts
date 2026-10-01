import type { Channel, Sender } from './types'

export type SampleId =
  | 'suspended'
  | 'prize'
  | 'pin'
  | 'voice'
  | 'clinic'
  | 'timetable'

export interface Sample {
  id: SampleId
  text: string
  channel: Channel
  sender: Sender
}

export const SAMPLES: Sample[] = [
  {
    id: 'suspended',
    text: 'Your account will be suspended today. Verify your details immediately using the link below.',
    channel: 'email',
    sender: 'unknown',
  },
  {
    id: 'prize',
    text: 'Congratulations! You have won US$500. Send your mobile money details to receive your prize.',
    channel: 'sms',
    sender: 'unknown',
  },
  {
    id: 'pin',
    text: 'Your payment has failed. Send your PIN so that our agent can reverse the transaction.',
    channel: 'sms',
    sender: 'unknown',
  },
  {
    id: 'voice',
    text: 'This voice message from your manager asks you to urgently transfer money to a new account.',
    channel: 'voice',
    sender: 'unknown',
  },
  {
    id: 'clinic',
    text: 'Your appointment at the clinic is confirmed for Tuesday at 10:00. Please bring your identification.',
    channel: 'sms',
    sender: 'known',
  },
  {
    id: 'timetable',
    text: 'Your university timetable has been published. Please log in through the usual student portal.',
    channel: 'email',
    sender: 'known',
  },
]

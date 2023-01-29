import Pocketbase from 'pocketbase'
import { POCKETBASE_URL } from '@/config/env'

export const client = new Pocketbase(POCKETBASE_URL)

client.autoCancellation(false)

export type User = typeof client.authStore.model

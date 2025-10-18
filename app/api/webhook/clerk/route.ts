import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    
    if(eventType === 'user.created') {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        const user = {
            clerkId: id!,
            email: email_addresses![0].email_address,
            username: username!,
            firstName: first_name!,
            lastName: last_name!,
            photo: image_url!
        }

        const newUser = await createUser(user);

        if(newUser) {
            const clerk = await clerkClient();
            await clerk.users.updateUserMetadata(id!, {
                publicMetadata: {
                    userId: newUser._id
                }
            })
        }

        return NextResponse.json({ message: 'Ok', user: newUser })
    }

    if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name!,
      lastName: last_name!,
      username: username!,
      photo: image_url!,
    }

    const updatedUser = await updateUser(id, user)

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser(id!)

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
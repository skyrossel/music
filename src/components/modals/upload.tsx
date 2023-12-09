'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from 'lucide-react'
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUpload } from '@/hooks/use-upload'
import { useUser } from '@/hooks/use-user'
import { Modal } from '@/components/ui/modal'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Upload = () => {
  const router = useRouter()
  const refresh = router.refresh

  const [isLoading, setIsLoading] = useState(false)

  const supabaseClient = useSupabaseClient()

  const user = useUser()

  const { isOpen, onClose } = useUpload()

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      image: null,
      song: null,
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const uniqueID = uniqid()

      const author = values.author.toLowerCase().replace(/\s+/g, '-')
      const title = values.title.toLowerCase().replace(/\s+/g, '-')
      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${author}-${title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

      if (imageError) {
        setIsLoading(false)
        return alert(imageError.message)
      }

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${author}-${title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return alert(songError.message)
      }

      if (!imageFile || !songFile) {
        return alert('You must fill in all missing fileds')
      }

      const { error } = await supabaseClient.from('songs').insert({
        user_id: user.user?.id,
        author: values.author,
        title: values.title,
        image_path: imageData.path,
        song_path: songData.path,
      })

      if (error) {
        return alert(error.message)
      }

      alert('You have successfully created a song')
      reset()
      refresh()
      onClose()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add a song"
      description="Fill out the fields below to upload the song."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              disabled={isLoading}
              placeholder="Author"
              {...register('author', {
                required: 'Author fields must contain at least 1 character',
                minLength: {
                  value: 1,
                  message: 'Author fields must contain at least 1 character',
                },
              })}
            />
            {errors.author && (
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.author.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              disabled={isLoading}
              placeholder="Title"
              {...register('title', {
                required: 'Title fields must contain at least 1 character',
                minLength: {
                  value: 1,
                  message: 'Title fields must contain at least 1 character',
                },
              })}
            />
            {errors.title && (
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.title.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="song">Song file</Label>
            <Input
              id="song"
              disabled={isLoading}
              type="file"
              accept="audio/*"
              className="w-fit cursor-pointer"
              {...register('song', {
                required: 'Song fields must contain 1 file',
                validate: (value) =>
                  value.length === 1 || 'Song fields must contain 1 file',
              })}
            />
            {errors.song && (
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.song.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image file</Label>
            <Input
              id="image"
              disabled={isLoading}
              type="file"
              accept="image/*"
              className="w-fit cursor-pointer"
              {...register('image', {
                required: 'Image fields must contain 1 file',
                validate: (value) =>
                  value.length === 1 || 'Image fields must contain 1 file',
              })}
            />
            {errors.image && (
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.image.message?.toString()}
              </span>
            )}
          </div>
        </div>
        <Button disabled={isLoading} type="submit" variant="white">
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Modal>
  )
}

export default Upload

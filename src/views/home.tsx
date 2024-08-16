import { createApiUrl } from '@/utils/url.ts'

export const Home = () => {
  return (
    <div>
      <div>view for home</div>
      <button
        onClick={async () => {
          const res = await fetch(createApiUrl('/api/views'), {
            credentials: 'include',
          })
          console.log(await res.json())
        }}
      >
        click me
      </button>
    </div>
  )
}

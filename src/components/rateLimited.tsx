import { Zap } from "lucide-react"

const RateLimited = () => {
  return (
    <section className='max-w-6xl mx-auto px-4 py-8'>
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className='flex flex-col md:flex-row items-center p-6'>
          <div className="flex-shrink-0 rounded-full bg-primary/20 p-4 mb-4 md:mb-0 md:mr-6">
            <Zap className="size-10 text-primary" />
          </div>
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-xl font-bold mb-2'>Rate Limit Reached</h1>
            <p className='text-base-content mb-1'>You've made too many request in short time period. Please wait a moment.</p>
            <p className='text-sm text-base-content/70'>Try again in a few seconds for the best experience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RateLimited
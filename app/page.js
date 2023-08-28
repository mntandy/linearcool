import Prover from '@/app/components/Prover'

export default function Home() {
  return (
    <>
    <p className="info">
      A visual theorem prover for the propositional fragment of multiplicative linear logic in prefix notation.
    </p>
    <p>
      <a href="/whatisthis">What do you mean? How does this work?</a>
    </p>
    <Prover/>
    </>
  )
}

This web app is a visual theorem prover for the propositional fragment of multiplicative linear logic based on Polish (i.e. prefix) notation. For an introduction to linear logic, see [https://plato.stanford.edu/entries/logic-linear/](https://plato.stanford.edu/entries/logic-linear/)

The app is written with ReactJS as a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A live version of this prover can be found here: [https://linearcool.fly.dev/](https://linearcool.fly.dev/)

## Short introduction to Polish notation and the formal language
The theorem prover processes formulas in Polish notation, that is, prefix notation. Formulas are constructed compositionally as follows: 
* if "C" is a binary operator and "A" and "B" are formulas, then "CAB" is a formula.
* if "N" is a unary operator and "A" is a formula, then "NA" is a formula.
In other words, the operator is directly infront of its subformulas. With this notation neither parantheses nor assumptions about presedence are required because the resulting formula will be unambiguous.

The theorem prover currently works for the following language:
* The binary operators C (for multiplicative conjunction) and D (for multiplicative disjunction)
* The unary operator N (for negation)
* lower case propositional variables (e.g. a,b,c,..,p,q,r).
The maximum number of distinct propositional variables in a formula is therefore 26. Here are examples of well-formed formulas:
* DCpDNqqNp
* DCCqqCqqp
* DpNp
* CDpNpDNpNNp

## Short introduction to the prover
The prover will attempt to construct a sequent calculus proof where sequents are one-sided. If you are unfamilar with sequent calculus, please see for example [https://plato.stanford.edu/entries/proof-theory-development/](https://plato.stanford.edu/entries/proof-theory-development/). Valid nodes and branches will be marked green, and invalid branches will be marked red. When it finds a valid branch among the options for a node, it will discard the other options. The memory in your computer sets the limit for the size of a proof. Try the above formulas.

In case the entire proof does not show within the area (canvas), you can use the mouse/pointer to move the proof around. I tested this with Firefox on Ubuntu, Chrome on ChromeOS and Chrome on Android. You can also zoom in or out. 

## Getting Started

First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
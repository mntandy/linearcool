This is a visual theorem prover for the propositional fragment of multiplicative linear logic based on Polish (i.e. prefix) notation. For an introduction to linear logic, see [https://plato.stanford.edu/entries/logic-linear/](https://plato.stanford.edu/entries/logic-linear/)


The source code can be found at [https://github.com/mntandy/linear-app](https://github.com/mntandy/linear-app)

## Polish notation and the formal language

The theorem prover processes formulas in Polish notation, that is, prefix notation. Formulas are constructed compositionally as follows:

* if "C" is a binary operator and "&phi;" and "&chi;" are formulas, then "C&phi;&chi;" is a formula.
* if "N" is a unary operator and "&phi;" is a formula, then "N&phi;" is a formula.

In other words, the operator is directly infront of its subformulas. With this notation neither parantheses nor assumptions about presedence are required because the resulting formula will be unambiguous.

The theorem prover currently works for the language based on the following symbols:

* The binary operators C (for multiplicative conjunction) and D (for multiplicative disjunction)
* The unary operator N (for negation)
* lower case propositional variables (e.g. a,b,c,..,p,q,r...).

The maximum number of distinct propositional variables in a formula is therefore 26. Here are examples of well-formed formulas:</p>

* DCpDNqqNp
* DCCqqCqqp
* DpNp
* CDpNpDNpNNp

Only two of these are valid. Try them out!

## The prover

The prover will attempt to construct a sequent calculus proof where sequents are one-sided. 

If you are unfamilar with sequent calculus, please see for example [https://plato.stanford.edu/entries/proof-theory-development/](https://plato.stanford.edu/entries/proof-theory-development/).

Roughly speaking, a sequent calculus proof is a proof shaped as a tree with the leaves being axioms and the root the conclusion. 
Each node is a sequent which represents a multiset of formulas. Since this is propositional multiplicative linear logic, an axiom is a sequent containing only a formula of the form DpNp or DNpp (where p is any lower case latin letter).
Valid nodes and branches will be marked green, and invalid branches will be marked red. When it finds a valid branch among the options for a node, it will discard the other options. 

The memory in your computer sets the limit for the size of a proof and thus the length of the theorem it can prove. 
However, proofs for long formulas will not display nicely.

In case the entire proof does not show within the area (canvas), you can use the mouse/pointer to move the proof around. You can also zoom in or out.
Try the above formulas.
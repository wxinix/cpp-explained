 # Type Query

This chapter presents a focused exploration of type query mechanisms in modern C++, emphasizing `decltype` and its interaction with value categories and type deduction. 

- The Introduction outlines the motivation and typical use cases for querying types at compile time. 

- The Mechanisms section details core tools such as decltype, typeid, std::declval, and type traits, with practical examples. 

- The Rules section formalizes the deduction behavior of decltype(e) through five canonical rules and edge cases involving cv-qualifiers and value categories.

- Finally, Best Practices offers guidance on when and how to use decltype effectively, especially in generic programming and library design, where exact type preservation is essential.

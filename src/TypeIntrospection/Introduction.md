# Introduction to Type Query in C++

Type query in C++ refers to the ability to inspect the type of an expression at compile time without evaluating it. This capability is essential in template meta programming and generic programming, where exact type information influences code generation and correctness. For example:

```cpp
int x = 42;
decltype(x) y = x; // y is deduced as int
```

**Type query mechanisms** serve several key purposes:
- Determine the exact type of an expression without requiring evaluation.
  ```cpp
  int getValue();
  // result has the type returned by getValue(), without calling it
  decltype(getValue()) result; 
  ```
- Enable compile-time type reflection useful in diagnostics, code synthesis, or meta programming.
  ```cpp
  template<typename T>
  void printTypeInfo(const T& val) {
    std::cout << "Type: " << typeid(decltype(val)).name() << '\n';
  }
  ```

- Preserve type qualifiers such as references and `const` for accurate type handling.
  ```cpp
  const int ci = 10;
  const int& ref = ci;
  // alias is of type const int&, ref and const are preserved
  decltype(ref) alias = ci; 
  ```





































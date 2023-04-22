# New Nested Namespace Syntax

Prior to C++17, nested namespaces are defined like this:

```cpp
namespace A {
    namespace B {
        namespace C {
            int foo() { return 5; }
        }
    }
}
```

With C++17, the same nested namespaces can be defined using the inline syntax concisely:

```cpp
namespace A::B::C {
    int foo() { return 5; }
}
```

Both of these code snippets achieve the same result: defining a function `foo()` in the namespace `A::B::C`. The inline namespace definition syntax introduced in C++17 allows for a more compact and readable way to define nested namespaces.

## Nested inline namespace

The combination of the nested namespace definition syntax (introduced in C++17) and the `inline` namespace declaration is allowed in C++20.

The following is valid in C++20:

```cpp
namespace A::B::inline C {
    int foo() { return 5; }
}
```

In this code, the `inline` keyword is applied to the `C` namespace within the nested namespace definition `A::B`. This declares `C` as an inline namespace within the enclosing namespace `B`.

Note `inline` keyword can appear before any namespace name except namespace `A`.
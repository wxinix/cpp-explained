# Namespace

C++ namespaces provide a way to group related declarations and definitions, such as classes, functions, and variables, under a common name. This helps to avoid naming conflicts between different parts of a program or different libraries that may be used together.

Namespaces were introduced into the C++ standard with the release of C++98. The syntax for declaring and defining namespaces is similar to that used for classes. Here's an example:

```cpp
// Declaration of a namespace
namespace MyNamespace {
    int x;
    void foo();
}

// Definition of the namespace's contents
namespace MyNamespace {
    int x = 42;
    void foo() {
        // Implementation of the function
    }
}
```

In this example, `MyNamespace` is declared and defined to contain an integer variable `x` and a function `foo()`. The namespace's contents can be accessed using the scope resolution operator `::`, like this:

```cpp
int main() {
    MyNamespace::x = 10;
    MyNamespace::foo();
    return 0;
}
```
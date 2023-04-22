# Unnamed Namespace

The `unnamed namespace` (or anonymous namespace) is a feature in C++ that was introduced in the C++98 standard. It provides a way to declare identifiers (e.g., functions, variables, or types) with internal linkage, meaning they are only visible within the scope of their parent namespace, or translation unit (i.e., the source file) in which they are defined.

`Unnamed namespaces` can be declared using the `namespace` keyword, followed by a pair of braces, like this:

```cpp
namespace {
    // Your code here
}
```

For example, a helper function or a constant that is only needed within a single source file, can be put in an unnamed namespace to prevent it from being accessible in other parts of the program:

```cpp
// File: my_file.cpp
#include "my_file.h"

namespace {
    const int someConstant = 42;

    void helperFunction() {
        // Implementation here
    }
}

void myPublicFunction() {
    helperFunction();
    // Other implementation details
}
```

In this example, `someConstant` and `helperFunction` are only visible within `my_file.cpp` and won't conflict with any other code using the same names.


Another example:

```cpp
namespace my_namespace {
    namespace {
        void helperFunction() {
            // Implementation here
        }
    }

    void publicFunction() {
        helperFunction(); // This is allowed since helperFunction() is in the same parent namespace
    }
}
```

In this example, `helperFunction()` is declared within an unnamed namespace inside `my_namespace`. Although `helperFunction()` has internal linkage and is not visible outside of the translation unit, it can still be accessed by other functions within the same parent namespace (`my_namespace`), such as `publicFunction()`.
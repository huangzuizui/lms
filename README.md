# Library Management System
## System Introduction
This is a command-line management system, making it feature basic book
management capabilities and a simple user interaction interface.

1. Users (User) and Administrators (Admin) can register and log in to the system.
2. Users can view the list of books, borrow multiple books, and return these books.
3. Administrators have the authority to view the list of books, add books, delete
   books. If a book is already in the system and the administrator tries to add it
   again, the system should merge the inventory rather than create a new one. Also,
   administrators cannot delete books that are currently being borrowed by users.

## How To Run
1. Clone this repository to your local machine.
2. Open the terminal and navigate to the root directory of this project.
3. Run `npm install` to install all dependencies.
4. Run `npm link` to link to the global environment.
5. Run `my_lms` to start the program.

## How To Use
After running `my_lms` command to run the program, you will see the following interface:

```welcome to library management system, please input your command (input exit to exit):```

You can input the following commands to interact with the system:
```shell
Options:
  -h, --help                         display help for command

Commands:
  register <role> <name> <password>  Register a new admin with name and
                                     password
  login <name> <password>            login with name and password
  logout                             logout
  list                               list all books
  search <bookName> <author>         Search book by book name and author
  borrow <bookName> <author>         Borrow book by book name and author
  delete <bookName> <author>         Delete book by name and author
  return <bookName> <author>         Return book by book name and author
  add <bookName> <author> <amount>   Add book inventory by book name and author
  help [command]                     display help for command
```

### Example
```shell
my_lms

$ register admin Alice password1
Admin Alice successfully registered.

$ register user Bob password2
User Bob successfully registered.

$ login Alice password1
Admin Alice successfully logged in.

$ add "Clean Code" "Robert C. Martin" 5
Book "Clean Code" by Robert C. Martin added successfully, inventory: 5.

$ list
Book List:
Clean Code - Robert C. Martin - Inventory: 5

$ login Bob password2
User Bob successfully logged in.

$ search "Clean Code" "Robert C. Martin"
Clean Code - Robert C. Martin - Inventory: 5

$ borrow "Clean Code" "Robert C. Martin"
Book "Clean Code" successfully borrowed.

$ login Alice password1
Admin Alice successfully logged in.

$ delete "Clean Code" "Robert C. Martin"
Cannot delete book "Clean Code" because it is currently borrowed.

$ login Bob password2
User Bob successfully logged in.

$ return "Clean Code" "Robert C. Martin"
Book "Clean Code" successfully returned.

$ login Alice password1
Admin Alice successfully logged in.

$ add "Clean Code" "Robert C. Martin" 3
Book "Clean Code" inventory successfully updated, new inventory: 8.
```
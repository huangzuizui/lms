const actionManager = require('../src/actions').default;

describe('Test register action', () => {
  it('should success and log registered infomation', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    actionManager.run('register')('admin', 'Tom', '123');
    expect(consoleLogSpy).toHaveBeenCalledWith('admin Tom successfully registered.');
    consoleLogSpy.mockClear()

    actionManager.run('register')('user', 'Jacky', '123');
    expect(consoleLogSpy).toHaveBeenCalledWith('user Jacky successfully registered.');

    consoleLogSpy.mockRestore();
  });
});

describe('Test list book action', () => {
  it('should list all books', () => {
    actionManager.run('register')('admin', 'Tom5', '123');
    actionManager.run('login')('Tom5', '123');
    actionManager.run('addBook')('book10', 'author1', '10');
    actionManager.run('addBook')('book20', 'author2', '5');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('listBook')();
    expect(consoleLogSpy.mock.calls).toEqual([['Book List:'], ['book10 - author1 - Inventory: 10'], ['book20 - author2 - Inventory: 5']]);
    consoleLogSpy.mockRestore();
  });
});
describe('Test login and logout action', () => {
  it('should success and log registered infomation', () => {
    actionManager.run('register')('admin', 'Tom1', '123');
    actionManager.run('register')('user', 'Jacky1', '1223');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('login')('Tom1', '123');
    expect(consoleLogSpy).toHaveBeenCalledWith('admin Tom1 successfully logged in.');
    consoleLogSpy.mockClear()
    actionManager.run('logout')();
    expect(consoleLogSpy).toHaveBeenCalledWith('admin Tom1 successfully logged out.');

    actionManager.run('login')('Jacky1', '1223');
    expect(consoleLogSpy).toHaveBeenCalledWith('user Jacky1 successfully logged in.');
    consoleLogSpy.mockClear();
    actionManager.run('logout')();
    expect(consoleLogSpy).toHaveBeenCalledWith('user Jacky1 successfully logged out.');

    consoleLogSpy.mockRestore();
  });
});
describe('Test access control action', () => {
  it('should fail when account not login', () => {
    actionManager.run('logout')();
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('listBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please login first');
    consoleLogSpy.mockClear();

    actionManager.run('borrowBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please login first');
    consoleLogSpy.mockClear();

    actionManager.run('returnBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please login first');
    consoleLogSpy.mockClear();

    actionManager.run('addBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please login first');
    consoleLogSpy.mockClear();

    actionManager.run('removeBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please login first');
    consoleLogSpy.mockRestore();
  });

  it('should fail when account is not admin', () => {
    actionManager.run('register')('user', 'Jacky2', '123');
    actionManager.run('login')('Jacky2', '123');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('addBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Permission denied');
    consoleLogSpy.mockClear();

    actionManager.run('removeBook')();
    expect(consoleLogSpy).toHaveBeenCalledWith('Permission denied');
    consoleLogSpy.mockRestore();
  });
});


describe('Test add book action', () => {
  it('should success', () => {
    actionManager.run('register')('admin', 'Tom4', '123');
    actionManager.run('login')('Tom4', '123');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('addBook')('book1', 'author1', '10');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book1" by author1 added successfully, inventory: 10.');
    consoleLogSpy.mockClear();

    actionManager.run('addBook')('book2', 'author2', '5');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book2" by author2 added successfully, inventory: 5.');
    consoleLogSpy.mockRestore();
  });
});

describe('Test search book action', () => {
  it('should success', () => {
    actionManager.run('register')('admin', 'Tom7', '123');
    actionManager.run('login')('Tom7', '123');
    actionManager.run('addBook')('book3', 'author3', '10');
    actionManager.run('addBook')('book4', 'author4', '5');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('searchBook')('book3', 'author3');
    expect(consoleLogSpy).toHaveBeenCalledWith('book3 - author3 - Inventory: 10');
    consoleLogSpy.mockClear();

    actionManager.run('searchBook')('book4', 'author4');
    expect(consoleLogSpy).toHaveBeenCalledWith('book4 - author4 - Inventory: 5');
    consoleLogSpy.mockRestore();
  });
});

describe('Test borrow book action', () => {
  it('should success', () => {
    actionManager.run('register')('admin', 'Tom8', '123');
    actionManager.run('login')('Tom8', '123');
    actionManager.run('addBook')('book5', 'author5', '10');
    actionManager.run('addBook')('book6', 'author6', '5');

    actionManager.run('register')('user', 'Jacky8', '123');
    actionManager.run('login')('Jacky8', '123');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('borrowBook')('book5', 'author5');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book5" successfully borrowed.');
    consoleLogSpy.mockClear();

    actionManager.run('borrowBook')('book6', 'author6');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book6" successfully borrowed.');
    consoleLogSpy.mockRestore();
  });
});

describe('Test return book action', () => {
  it('should success', () => {
    actionManager.run('register')('admin', 'Tom9', '123');
    actionManager.run('login')('Tom9', '123');
    actionManager.run('addBook')('book7', 'author7', '10');
    actionManager.run('addBook')('book8', 'author8', '5');

    actionManager.run('register')('user', 'Jacky9', '123');
    actionManager.run('login')('Jacky9', '123');

    actionManager.run('borrowBook')('book7', 'author7');
    actionManager.run('borrowBook')('book8', 'author8');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    actionManager.run('returnBook')('book7', 'author7');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book7" successfully returned.');
    consoleLogSpy.mockClear();

    actionManager.run('returnBook')('book8', 'author8');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book8" successfully returned.');
    consoleLogSpy.mockRestore();
  });
});

describe('Test delete book action', () => {
  it('should success', () => {
    actionManager.run('register')('admin', 'Tom10', '123');
    actionManager.run('login')('Tom10', '123');
    actionManager.run('addBook')('book9', 'author9', '10');
    actionManager.run('addBook')('book10', 'author10', '5');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    });
    actionManager.run('deleteBook')('book9', 'author9');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book9" successfully deleted.');
    consoleLogSpy.mockClear();

    actionManager.run('deleteBook')('book10', 'author10');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book10" successfully deleted.');
    consoleLogSpy.mockRestore();
  });

  it('should fail if book is borrowed and success after returned', () => {
    actionManager.run('register')('admin', 'Tom11', '123');
    actionManager.run('login')('Tom11', '123');
    actionManager.run('addBook')('book11', 'author11', '10');

    actionManager.run('register')('user', 'Jacky11', '123');
    actionManager.run('login')('Jacky11', '123');
    actionManager.run('borrowBook')('book11', 'author11');

    actionManager.run('login')('Tom11', '123');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    });
    actionManager.run('deleteBook')('book11', 'author11');
    expect(consoleLogSpy).toHaveBeenCalledWith('Cannot delete book book11 - author11 because it is currently borrowed.');
    consoleLogSpy.mockClear();

    actionManager.run('login')('Jacky11', '123');
    actionManager.run('returnBook')('book11', 'author11');
    actionManager.run('login')('Tom11', '123');
    consoleLogSpy.mockClear();

    actionManager.run('deleteBook')('book11', 'author11');
    expect(consoleLogSpy).toHaveBeenCalledWith('Book "book11" successfully deleted.');
    consoleLogSpy.mockRestore();
  });
});

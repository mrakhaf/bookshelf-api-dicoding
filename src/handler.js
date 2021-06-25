const {nanoid} = require('nanoid')
const books = require('./books')

const saveBooksHandler = (request, h) => {
    const id = nanoid(16);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const nameValidation = (name === "") || (name === undefined);
    const readPageValidation = readPage > pageCount;
    const finished = readPage === pageCount;
    const isSuccess = (nameValidation === false) && (readPageValidation === false)

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished
    }

    if (isSuccess) {
        books.push(newBook);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
    }

    if (nameValidation){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    
    if (readPageValidation){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

// const getAllBooksHandler = (response, h) => {
//     const bookItems = books.map(book => {
//         const {id, name, publisher} = book
//         return {id, name, publisher}
//     })

//     const response = h.response({
//         status: 'success',
//         data: {
//             books: bookItems
//         }
//     });
//     response.code(200);
//     return response;
// }

const getAllBooksHandler = () => ({
    status: "success",
    data: {
        books: books.map(book => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        }))
    }
})

const getBookByIdHandler = (request, h) => {
    const { id } = request.params
    const book = books.filter(value => value.id === id)[0]

    if (book !== undefined){
        return {
            status: 'success',
            data: book
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editBookByIdHandler = (request, h) => {
    const { id } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    const nameValidation = (name === "") || (name === undefined);
    const readPageValidation = readPage > pageCount;
    const isSuccess = (nameValidation === false) && (readPageValidation === false)

    if (index !== -1) {
        if(isSuccess){
            books[index] = {
                ...books[index],
                name, year, author, summary, publisher, pageCount, readPage, reading,
                updatedAt,
              };
      
              const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
              });
              response.code(200);
              return response;
        } 
        if (nameValidation){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        
        if (readPageValidation){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }
      }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {saveBooksHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }
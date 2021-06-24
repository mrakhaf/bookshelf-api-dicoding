const Joi = require('joi')
const {saveBooksHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler')
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: saveBooksHandler,
        // options: {
        //     validate: {
        //         payload: Joi.object({
        //             name: Joi.string(),
        //             year: Joi.number(),
        //             author: Joi.string(),
        //             summary: Joi.string(),
        //             publisher: Joi.string(),
        //             pageCount: Joi.number(),
        //             readPage: Joi.number(),
        //             reading: Joi.boolean()
        //         })
        //     }
        // }

    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "Hello"
        }
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler
    },
    {
        method: 'POST',
        path: '/books/{id}',
        handler: editBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler
    }
]

module.exports = routes
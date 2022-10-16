const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.description = 'Get all contacts'
    const result = await mongodb.getDb().db("cs_341_projects").collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    // #swagger.description = 'Get single contact by ID'
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cs_341_projects").collection('contacts').find({
        _id: userId
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res) => {
    // #swagger.description = 'Create contact'
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        title: req.body.title,
        img_url: req.body.img_url
    };
    const response = await mongodb.getDb().db("cs_341_projects").collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    // #swagger.description = 'Update contact'
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        title: req.body.title,
        img_url: req.body.img_url
    };
    const response = await mongodb
        .getDb()
        .db("cs_341_projects")
        .collection('contacts')
        .replaceOne({
            _id: userId
        }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    // #swagger.description = 'Delete contact's
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db("cs_341_projects").collection('contacts').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

// const createContact = async (req, res, next) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             title,
//             img_url
//         } = req.body;
//         const response = Contact.createContact({
//             firstName,
//             lastName,
//             email,
//             title,
//             img_url,
//         });

//         res.status(201);
//         res.json({
//             _id: response.instertedID
//         });
//     } catch (e) {
//         next(e);
//     }
// };


// const updateContact = async (req, res, next) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             title,
//             img_url
//         } = req.body;

//         await Contact.updateContact(req.params.id, {
//             firstName,
//             lastName,
//             email,
//             title,
//             img_url,
//         });

//         res.status(204);
//         res.json(req.body);
//     } catch (e) {
//         next(e);
//     }
// };

// const deleteContact = async (req, res, next) => {
//     try {
//         await Contact.deleteContact(req.params.id);

//         res.status(200);
//         res.end();
//     } catch (e) {
//         next(e);
//     }
// };

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};

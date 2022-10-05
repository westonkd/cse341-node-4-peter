const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db("cse341-watson").collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({
        _id: userId
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;
        const response = Contact.createContact({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday,
        });

        res.status(201);
        res.json({
            _id: response.instertedID
        });
    } catch (e) {
        next(e);
    }
};


const updateContact = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        await Contact.updateContact(req.params.id, {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday,
        });

        res.status(204);
        res.json(req.body);
    } catch (e) {
        next(e);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        await Contact.deleteContact(req.params.id);

        res.status(200);
        res.end();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
const db = require('../db/db');

//obtener todos los contactos
const getContacts = async (req, res) => {
  try {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
      if (err) {return res.status(500).send('Error listanto contactos');}
        res.status(200).json({
            code:200,
            message: 'Contacts retrieved successfully',
            data:rows
        });
    });
   
  } catch (error) {
    res.status(500).send('Error retrieving contacts');
  }
}

const createContact = async (req, res) => {
  try {
    const {firstName,lastName,email,phone} = req.body;

    const stmt = 'INSERT INTO contacts (firstName, lastName, email, phone) VALUES (?, ?, ?, ?)';
    db.run(stmt, [firstName, lastName, email, phone], function(err) {
        console.log('Contact created with ID:', this.lastID);
        console.log(err)
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            code:201,
            message: 'Contact created successfully',
            data: {
                id: this.lastID,
                firstName,
                lastName,
                email,
                phone
            }
        });
    });
    
  } catch (error) {
    res.status(500).send('Error creating contact');
  }
}

const updateContact = async (req, res) => {
  try {
    const {firstName,lastName,email,phone} = req.body;
    const { id } = req.params;
    const stmt = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?';
    db.run(stmt, [firstName, lastName, email, phone, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            code:200,
            message: 'Contact updated successfully',
            data:{
                id,
                firstName,
                lastName,
                email,
                phone
            }
        });
    });
  } catch (error) {
    res.status(500).send('Error updating contact');
  }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    db.run('DELETE FROM contacts WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            code:200,
            message: 'Contact deleted successfully',
            data: null
        });
    });
    
  } catch (error) {
    res.status(500).send('Error deleting contact');
  }
}

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};
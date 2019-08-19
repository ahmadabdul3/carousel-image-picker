import fs from 'fs';
import path from 'path';
import repl from 'repl';
import db from 'src/db/models';

const { sequelize } = db;
const envName = process.env.NODE_ENV || "dev";

// open the repl session
const replServer = repl.start({
  prompt: "app - " + envName + " >> ",
});

// attach my modules to the repl context
replServer.context.db = db;
replServer.context.path = path;
replServer.context.fs = fs;
replServer.context.dirname = __dirname;
replServer.context.filename = __filename;
replServer.context.getAll = getAll;

function getAll(modelName) {
  db[modelName].findAll().then(res => {
    res.forEach(record => {
      console.log('*** RECORD START ***');
      console.log(record.dataValues || 'No Record Found');
      console.log('*** RECORD END ***');
    });
  });
}

// ***
// some useful sequelize queries
// ***

// db.politician.findAll({
//   include: [
//     db.officeHolderTerm,
//     db.contactInfo,
//   ]
// }).then(res => {
//   politician = res[0].dataValues;
// });
//
// politician.officeHolderTerms[0].dataValues
// politician.contactInfos[0].dataValues
//
// db.contactInfo.create({
//   ...contactInfoPolitician,
//   id: null,
//   politicianId: null,
//   officeHolderTermId: officeHolderTerm.id
// }).then(res => {
//   contactInfoOht = res;
// });
//
// db.politician.findAll({
//   include: [{
//     model: db.officeHolderTerm,
//     required: true,
//     where: {
//       levelOfResponsibility: 'district',
//       areaOfResponsibility: '1',
//     },
//     include: [{
//       model: db.contactInfo,
//       required: true,
//       where: {
//         city: { ilike: 'new haven' },
//         state: { ilike: 'connecticut' },
//       },
//     }],
//   }],
// }).then(res => {
//   result = res;
// });
//
// result[0].dataValues.officeHolderTerms[0].dataValues
//
// db.politician.findAll({
//   include: [ db.contactInfo ],
// }).then(res => {
//   res.forEach(item => {
//     console.log(item.get({ plain: true }));
//   });
// });

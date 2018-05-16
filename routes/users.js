const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');
const dtime = require('time-formater');

/* GET users listing. */
router.get('/', function(req, res, next) {

    let childData = {
        Type: 'U',   // U => Usage Data    A => AnswerData
        DateOfTreatment: String,
        UsageRecord: [{
            PresetNumber: '1',
            MinOfUse: '5',
            MinOfPause: '4',
            Channel1MaxAmpUsed: '5',
            Channel1AverageAmpUsed: '8',
            Channel2MaxAmpUsed: '0',
            Channel2AverageAmpUsed: '5',
        }],
        AnswerData: [
            {
                Q_Name: 'Q1',
                A_Value: 'Y',
            }],
    };

    const Data = new UserData({
        SerialNumber: '1',
        PatientName: '2',
        PatientEmail: '3',
        DoctorEmail: '4',
        DeviceName: '5',
        UpdateData: [
            {
                ConfigData: {
                    ComplianceTime: '6',
                    Language: '7',
                    Brightness: '8',
                    Audible: true,
                    NightMode: true
                },
                PresetData: [{
                    PresetNumber: '9',
                    ElectrodeSize: '10',
                    StimulationType: '11',
                    ModeSettings: '12',
                    TreatmentTime: '13',
                    NumberOfCycles: '14',
                    NextPresetToUse: '15',
                    BeatFrequency: '16',
                },{
                    PresetNumber: '1',
                    ElectrodeSize: '2',
                    StimulationType: '3',
                    ModeSettings: '4',
                    TreatmentTime: '5',
                    NumberOfCycles: '6',
                    NextPresetToUse: '7',
                    BeatFrequency: '8',
                }],
                UsageData: [childData],
                UpdateTime: dtime().format('YYYY-MM-DD HH:mm'),
            }
        ]
    })



    UserData.find((err, doc) => {
        if (doc !== null) {
            res.render('users', { data: doc });
        }
    });

    /*Data.save((err, response) => {
        if(err){
            console.log('err:',err)
        }else {
            //console.log(response);
            console.log(Data.UpdateData[0].UsageData)
        }
    });
*/
    //console.log(UserData);

   /* newData.save((err, response) => {
        if (err) {
            console.log('err:', err);
        }
        console.log('res:',response);
    })*/


  // find one + save()
  /* demo
  temp.findOne({name:'huochai'},function(err,doc){
      //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 10 }
      console.log(doc);
      doc.age += 100;
      doc.save();
  });*/
});

/*  data page  */
router.get('/data/:id', (req, res, next) => {
    let id = req.params.id;
    UserData.findById(id, (err, doc) => {
        res.render('data', {
            data: doc,
        });
    });
});

/*  detail page  */
router.get('/data/detail/:id', (req, res, next) => {
    let id = req.params.id;
    UserData.findById(id, (err, doc) => {
        res.render('detail', {
            data: doc,
        });
    });
});

module.exports = router;

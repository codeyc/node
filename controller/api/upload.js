
const UserData = require('../../models/UserData');
const dtime = require('time-formater');

class Upload {
    async uploadRecode(req, res, next) {
        try {
            let data = req.body;
            let Data = new UserData();
            Data.SerialNumber = data.SerialNumber;
            // UserInfo Data
            Data.UserInfo.PatientName = data.UserInfo.PatientName;
            Data.UserInfo.PatientEmail = data.UserInfo.PatientEmail;
            Data.UserInfo.DoctorEmail = data.UserInfo.DoctorEmail;
            Data.UserInfo.DeviceName = data.UserInfo.DeviceName;

            // Config Data
            let Config = {};
            Config.ComplianceTime = data.Config[0];
            Config.Language = data.Config[1];
            Config.Brightness = data.Config[2];
            Config.Audible = data.Config[3];
            Config.NightMode = data.Config[4];

            // Preset Data
            let Preset = [];
            for(let i = 0; i < data.Preset.length; i++) {
                Preset.push({
                    PresetNumber: i + 1,
                    ElectrodeSize: data.Preset[i][0],
                    StimulationType: data.Preset[i][1],
                    ModeSettings: data.Preset[i][2],
                    TreatmentTime: data.Preset[i][3],
                    NumberOfCycles: data.Preset[i][4],
                    NextPresetToUse: data.Preset[i][5],
                    BeatFrequency: data.Preset[i][6],
                })
            }

            let Usage = [];
            for(let i = 0; i < data.Usage.length; i++) {
                // Usage Data
                if(data.Usage[i][0] === 'U') {
                    Usage.push({
                        Type: data.Usage[i][0],
                        DateOfTreatment: data.Usage[i][1][0],
                        TimeOfTreatment: data.Usage[i][1][1],
                        PresetNumber: data.Usage[i][2],
                        MinOfUse: data.Usage[i][3],
                        MinOfPause: data.Usage[i][4],
                        Channel1MaxAmpUsed: data.Usage[i][5],
                        Channel1AverageAmpUsed: data.Usage[i][6],
                        Channel2MaxAmpUsed: data.Usage[i][7],
                        Channel2AverageAmpUsed: data.Usage[i][8],
                    })
                } else {
                    // Q & A
                    Usage.push({
                        Type: data.Usage[i][0],
                        DateOfTreatment: data.Usage[i][1][0],
                        TimeOfTreatment: data.Usage[i][1][1],
                        PainBefore: data.Usage[i][2],
                        PainAfter: data.Usage[i][3],
                        DecrMeds: data.Usage[i][4],
                        HelpWork: data.Usage[i][5],
                        HelpHome: data.Usage[i][6],
                    })
                }
            }

            // save data
            UserData.findOne({ 'SerialNumber' : req.body.SerialNumber }, (err, doc) => {
                if (!doc) {
                    Data.UpdateData.push({
                        ConfigData: Config,
                        PresetData: Preset,
                        UsageData: Usage,
                        UpdateTime: dtime().format('YYYY-MM-DD HH:mm'),
                    });
                    Data.save((err, response) => {
                        // 还未保存过的用户，会新增用户id
                        if (err) console.log('err:', err);
                        else {
                            console.log('save done');
                            res.json({'status':'1','data':'success!'});
                            res.end();
                        }
                    });
                } else {
                    // 已经保存过的用户，在原来的数据上添加数据
                    doc.UpdateData.push({
                        ConfigData: Config,
                        PresetData: Preset,
                        UsageData: Usage,
                        UpdateTime: dtime().format('YYYY-MM-DD HH:mm'),
                    });
                    doc.save((err, response) => {
                        if (err) console.log('err:', err);
                        else {
                            res.json({'status':'1','data':'push success!'});
                            res.end();
                        }
                    })
                }
            });
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new Upload();
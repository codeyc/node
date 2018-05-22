
const mongoose =require('mongoose');

const Schema = mongoose.Schema;


const UsageDataSchema = new Schema({
    Type: String,   // U => Usage Data    A => AnswerData
    DateOfTreatment: { type: String, default: Date.now() },
    PresetNumber: String,
    MinOfUse: String,
    MinOfPause: String,
    Channel1MaxAmpUsed: String,
    Channel1AverageAmpUsed: String,
    Channel2MaxAmpUsed: String,
    Channel2AverageAmpUsed: String,
    PainBefore:  String,
    PainAfter:  String,
    DecrMeds:  String,
    HelpWork:  String,
    HelpHome:  String,
});

const UserDataSchema = new Schema({
    SerialNumber: String,
    UserInfo: {
        PatientName: String,
        PatientEmail: String,
        DoctorEmail: String,
        DeviceName: String,
    },
    UpdateData: [
        // Update first time
        {
            ConfigData: {
                ComplianceTime: String,
                Language: String,
                Brightness: String,
                Audible: Boolean,
                NightMode: Boolean
            },
            PresetData: [{
                    PresetNumber: String,
                    ElectrodeSize: String,
                    StimulationType: String,
                    ModeSettings: String,
                    TreatmentTime: String,
                    NumberOfCycles: String,
                    NextPresetToUse: String,
                    BeatFrequency: String,
            }],
            UsageData: [UsageDataSchema],
            UpdateTime: { type: String, default: Date.now() },
        }
    ],
});

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;
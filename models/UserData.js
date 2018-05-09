
const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    SerialNumber: String,
    PatientName: String,
    PatientEmail: String,
    DoctorEmail: String,
    DeviceName: String,
    UpdateData: [
        {
            ConfigData: {
                ComplianceTime: String,
                Language: String,
                Brightness: Number,
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
            UsageData: {
                DateOfTreatment: { type: String, default: Date.now()},
                PresetNumber: Number,
                MinOfUse: Number,
                MinOfPause: Number,
                ChannelMax: Number,
                ChannelAverage: Number,
                AnswerData: [],
            },
            UpdateTime: { type: String, default: Date.now()},
        }
    ]
});

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;
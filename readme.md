#### Data Json 
```
const UsageDataSchema = new Schema({
    Type: String,   // U => Usage Data    A => AnswerData
    DateOfTreatment: { type: String, default: Date.now() },
    UsageRecord: [{
        PresetNumber: String,
        MinOfUse: String,
        MinOfPause: String,
        Channel1MaxAmpUsed: String,
        Channel1AverageAmpUsed: String,
        Channel2MaxAmpUsed: String,
        Channel2AverageAmpUsed: String,
    }],
    AnswerData: [
        {
            Q_Name: String,
            A_Value: String,
        }
    ],
});

const UserDataSchema = new Schema({
    SerialNumber: String,
    UserInfo: {
        PatientName: String,
        PatientEmail: String,
        DoctorEmail: String,
        DeviceName: String,
    }
   
    UpdateData: [
        // Update first time  UpdateData[0]
        {
            ConfigData: {
                ComplianceTime: String,
                Language: String,
                Brightness: String,
                Audible: Boolean,
                NightMode: Boolean
            },
            
            // 20 个 json 
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

```

#### Data Json 
```
_id: String,  // user 1
SerialNumber: Number,
PatientName: String,
PatientEmail: String,
DoctorEmail: String,
DeviceName: String,
UpdateData:[
    {
        config: {ComplianceTime: Date, Lanuage: 'English', ...},
        PresetData: { TreatmentTime: Date, NextPresetUse: Number, ...},
        UsageData: { PresetNumber: Number, Reserved: String, AnswerData:[{...}], ...},
        UpdateTime: Date   // Date 1
    },
    {
        config: {ComplianceTime: Date, Lanuage: 'English', ...},
        PresetData: { TreatmentTime: Date, NextPresetUse: Number, ...},
        UsageData: { PresetNumber: Number, Reserved: String, AnswerData:[{...}], ...},
        UpdateTime: Date   // Date 2
    },
]


_id: String,   // user 2
SerialNumber: Number,
PatitentName: String,
PatientEmail: String,
DoctorEmail: String,
DeviceName: String,
UpdateData:[
    {
        config: {ComplianceTime: Date, Lanuage: 'English', ...},
        PresetData: { TreatmentTime: Date, NextPresetUse: Number, ...},
        UsageData: { PresetNumber: Number, Reserved: String, AnswerData:[{...}], ...},
        UpdateTime: Date    // Date 1
    },
    {
        config: {ComplianceTime: Date, Lanuage: 'English', ...},
        PresetData: { TreatmentTime: Date, NextPresetUse: Number, ...},
        UsageData: { PresetNumber: Number, Reserved: String, AnswerData:[{...}], ...},
        UpdateTime: Date   // Date2
    },
]

```

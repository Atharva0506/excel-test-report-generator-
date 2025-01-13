

// Map of month abbreviations
const monthMap = {
    0: 'A', // January
    1: 'B', // February
    2: 'C', // March
    3: 'D', // April
    4: 'E', // May
    5: 'F', // June
    6: 'G', // July
    7: 'H', // August
    8: 'J', // September
    9: 'K', // October
    10: 'L', // November
    11: 'M', // December
};

const currentMonthIndex = new Date().getMonth();
const currentMonthCode = monthMap[currentMonthIndex];
const year = new Date().getFullYear().toString().substr(-2)
const month_year_code = year + currentMonthCode


const productTemplates = {
    "LED LIGHT : 1W, 12V": {
        "date": "26/03/2019",
        "DOC NO": "80 R2",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "CURRENT CONSUMPTION FOR 12V (0.06 - 0.08) (AMP)", "OVP DISCONNECT (15V +/- 0.5V) (VOLTS)", "OVP RECONNECT (14.5V +/- 0.5V) (VOLTS)", "OVP SUSTAINING (@30V) (VOLTS)"],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.08 - 0.06) + 0.06).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                ];
            });
        },
    },
    "LED LIGHT : 1W, 24V": {
        "date": "26/03/2019",
        "DOC No": "96 R1",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "CURRENT CONSUMPTION FOR 24V (0.03) to 0.05 (AMP)", "OVP DISCONNECT (29V +/- 1.0V) (VOLTS)", "OVP RECONNECT(28V +/- 0.8V) (VOLTS)", "OVP SUSTAINING (@ 30V) (VOLTS)"],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.05 - 0.03) + 0.03).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                ];
            });
        },
    },
    "LED TUBE : 2W, 12V": {
        "date": "26/03/2019",
        "DOC NO": "78 R1",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "CURRENT CONSUMPTION FOR 12V (0.12 to 0.15) (AMP)", "OVP DISCONNECT (15V +/- 0.5V)", "OVP RECONNECT(14.5V +/- 0.5V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.15 - 0.12) + 0.12).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                    "✔"
                ];
            });
        },
    },
    "LED TUBE : 2W, 12V (16V DISCONECT) (006037271H91)": {
        "date": "",
        "DOC NO": "",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "@12V (0.12 to 0.14) (AMP)", "@10V (LED GLOW)", "@ OVP DISCONNECT (16V +0.7 , -0V)", "OVP RECONNECT(above 15.40V)", "OVP SUSTAINING (30V)", "ON/OFF Operation 5 times "],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.14 - 0.12) + 0.12).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                    "✔",
                    "✔"
                ];
            });
        },
    },
    "LED TUBE : 2W, 24V": {
        "date": "",
        "DOC NO": "",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "CURRENT CONSUMPTION FOR 24V (0.06 to 0.08) (AMP)", "OVP DISCONNECT (29V +/- 1.0V)", "OVP RECONNECT(28V +/- 0.75V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.08 - 0.06) + 0.06).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                    "✔"
                ];
            });
        },
    },
    "LED TUBE : 2W, 12V KOEL(K1B) (D8.079.48.0.PR)": {
        "date": "13/02/2020",
        "DOC NO": "QA 89R",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "FOR 12V (0.12 - 0.15) (AMP)", "OVP DISCONNECT (16.4V +/- 0.4V)", "OVP RECONNECT(15V +/- 0.5V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.15 - 0.12) + 0.12).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                    "✔"
                ];
            });
        },
    },
    "LED TUBE : 2W, 24V KOEL(K2B) (D8.079.49.0.PR)": {
        "date": "13/02/2020",
        "DOC NO": "QA 89R2",
        header: ["SR. NO", `UNIT NO ${month_year_code}`, "FOR 24V (0.06 - 0.08) (AMP)", "OVP DISCONNECT (29V +/- 0.5V)", "OVP RECONNECT(28.25V +/- 0.75V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
        columns: [
            { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
        ],
        data: (units) => {
            return units.map((unit, index) => {
                const amp = (Math.random() * (0.08 - 0.06) + 0.06).toFixed(2);
                return [
                    index + 1,
                    unit,
                    amp,
                    "✔",
                    "✔",
                    "✔",
                    "✔"
                ];
            });
        },
    },
};

export default productTemplates
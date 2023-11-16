const { createApp } = Vue;
const dt = luxon.DateTime;

const dataNow = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);

console.log(dataNow);


let contacts = [
    {
    name: 'Michele',
    avatar: '_1',
    visible: false,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Hai portato a spasso il cane?',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Ricordati di stendere i panni',
        status: 'sent'
        },
        {
        date: '10/01/2020, 16:15:22',
        message: 'Tutto fatto!',
        status: 'received'
        }
        ],
    },
    {
    name: 'Fabio',
    avatar: '_2',
    visible: true,
    messages: [
        {
        date: '20/03/2020, 16:30:00',
        message: 'Ciao come stai?',
        status: 'sent'
        },
        {
        date: '20/03/2020, 16:30:55',
        message: 'Bene grazie! Stasera ci vediamo?',
        status: 'received'
        },
        {
        date: '20/03/2020, 16:35:00',
        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
        status: 'sent'
        }
        ],
    },
    {
    name: 'Samuele',
    avatar: '_3',
    visible: true,
    messages: [
        {
        date: '28/03/2020, 10:10:40',
        message: 'La Marianna va in campagna',
        status: 'received'
        },
        {
        date: '28/03/2020, 10:20:10',
        message: 'Sicuro di non aver sbagliato chat?',
        status: 'sent'
        },
        {
        date: '28/03/2020, 16:15:22',
        message: 'Ah scusa!',
        status: 'received'
        }
        ],
    },
    {
    name: 'Alessandro B.',
    avatar: '_4',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Lo sai che ha aperto una nuova pizzeria?',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Si, ma preferirei andare al cinema',
        status: 'received'
        }
        ],
    },
    {
    name: 'Alessandro L.',
    avatar: '_5',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Ricordati di chiamare la nonna',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Va bene, stasera la sento',
        status: 'received'
        }
        ],
    },
    {
    name: 'Claudia',
    avatar: '_6',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Ciao Claudia, hai novità?',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Non ancora',
        status: 'received'
        },
        {
        date: '10/01/2020, 15:51:00',
        message: 'Nessuna nuova, buona nuova',
        status: 'sent'
        }
        ],
    },
    {
    name: 'Federico',
    avatar: '_7',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Fai gli auguri a Martina che è il suo compleanno!',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Grazie per avermelo ricordato, le scrivo subito!',
        status: 'received'
        }
        ],
    },
    {
    name: 'Davide',
    avatar: '_8',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Ciao, andiamo a mangiare la pizza stasera?',
        status: 'received'
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
        status: 'sent'
        },
        {
        date: '10/01/2020, 15:51:00',
        message: 'OK!!',
        status: 'received'
        }
        ],
    }
];


createApp({
    data () {
        return {
            contacts,
            selectIndex: 0,
            lastAccess: contacts[0].messages[0].date,
            newMessage: "",
            dataNow,
        }
    },
    created() {
    },
    methods: {
        readLastValueMessage(array) {
            const lengthArray = (array.messages).length;
            return array.messages[lengthArray - 1];
        },

        ciao(array) {
            return array.length - 1
        },

        showAllChat(array, index) {
            contacts.forEach(element => {
                element.visible = true;
            });
            array.visible = false;
            this.selectIndex = index
            const lengthMessages = (array.messages).length;
            this.lastAccess = contacts[this.selectIndex].messages[lengthMessages - 1].date;
        },

        readMessageValue(array) {
            return array.messages;
        },

        itSendOrReceived(message) {
            if(message.status === 'sent'){
                return 'sent'
            } else {
                return 'received'
            }
        },

        sendMessage(array) {
            let tempMessage = {
                date: this.dataNow,
                message: this.newMessage,
                status: 'sent'
            };
            array.push(tempMessage);
            this.newMessage = "";
            setTimeout(() => this.receivedMess(array), 2000)
        },

        receivedMess(array) {
            let tempMessage = {
                date: this.dataNow,
                message: "ok",
                status: 'received'
            };
            array.push(tempMessage);
        },

        onlyHour(array) {
            return array.slice(-8, -3)
        },

        clearMessage(array, index) {
            return array.splice(index, 1)
        }
    }
}).mount("#wrapper")
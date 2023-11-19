const { createApp } = Vue;
const dt = luxon.DateTime;

let contacts = [
    {
    name: 'Michele',
    avatar: '_1',
    visible: true,
    messages: [
        {
        date: '10/01/2020, 15:30:55',
        message: 'Hai portato a spasso il cane?',
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Ricordati di stendere i panni',
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 16:15:22',
        message: 'Tutto fatto!',
        status: 'received',
        visible: true
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
        status: 'sent',
        visible: true
        },
        {
        date: '20/03/2020, 16:30:55',
        message: 'Bene grazie! Stasera ci vediamo?',
        status: 'received',
        visible: true
        },
        {
        date: '20/03/2020, 16:35:00',
        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
        status: 'sent',
        visible: true
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
        status: 'received',
        visible: true
        },
        {
        date: '28/03/2020, 10:20:10',
        message: 'Sicuro di non aver sbagliato chat?',
        status: 'sent',
        visible: true
        },
        {
        date: '28/03/2020, 16:15:22',
        message: 'Ah scusa!',
        status: 'received',
        visible: true
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
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Si, ma preferirei andare al cinema',
        status: 'received',
        visible: true
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
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Va bene, stasera la sento',
        status: 'received',
        visible: true
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
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Non ancora',
        status: 'received',
        visible: true
        },
        {
        date: '10/01/2020, 15:51:00',
        message: 'Nessuna nuova, buona nuova',
        status: 'sent',
        visible: true
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
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'Grazie per avermelo ricordato, le scrivo subito!',
        status: 'received',
        visible: true
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
        status: 'received',
        visible: true
        },
        {
        date: '10/01/2020, 15:50:00',
        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
        status: 'sent',
        visible: true
        },
        {
        date: '10/01/2020, 15:51:00',
        message: 'OK!!',
        status: 'received',
        visible: true
        }
        ],
    }
];

const myEmoji = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];

const textInputValue = document.getElementById("input-text-message").value;

createApp({
    data () {
        return {
            contacts,
            textInputValue,
            myEmoji,
            selectIndex: 0,
            searchText: "",
            searchChat: "",
            visible: {
                emoji: false,
                searchChat: false,
                notice: false,
                searchMex: false
            }
        }
    },
    created() {
        this.refreshLastAccess();
    },
    methods: {

        // Legge sempre l'ultimo valore di un array
        readLastValueMessage(array) {
            const lengthArray = (array.messages).length;
            return array.messages[lengthArray - 1];
        },

        // Cmabia elementi in pagina in base alla chat selezionata
        showThisChat(index) {
            this.selectIndex = index;
            this.searchChat = "";
            this.visible.searchChat = false;
        },

        // Invia un messaggio
        sendMessage(array) {
            let tempMessage = {
                date: this.dataNow(),
                message: this.textInputValue.trim(),
                status: 'sent',
                visible: true
            };
           if(this.textInputValue.trim() !== ""){
            array.push(tempMessage);
            this.audioSend()
            this.isWriting(this.contacts[this.selectIndex].messages);
            setTimeout(() => this.receivedMess(array), 3000);
            }
            this.textInputValue = "";
            this.closeEmoji();
        },

        // Ricevi un messaggio autogenerato
        receivedMess(array) {
            const answers = ["va bene", "certo!!", "ne parliamo dopo", "ok", "tra poco"];
            let tempMessage = {
                date: this.dataNow(),
                message: answers[this.generateRndNumber(5)],
                status: 'received',
                visible: true
            };
            array.push(tempMessage);
            this.clearIsWriting();
            this.audioReceived();
            this.refreshLastAccess();
        },

        // Mostra solo ore e minuti
        onlyHour(array) {
            return array.slice(-8, -3);
        },

        // Cancella un elemento di un'array
        clearMessage(array, index) {
            array.splice(index, 1);
        },

        // Avvia una ricerca nella searchbar
        searchUser() {
            let search = this.searchText.toLowerCase();
            this.contacts.forEach(elem => {
                elem.visible = false;
                if(elem.name.toLowerCase().includes(search)){
                elem.visible = true;
                }
            })
        },

        // Genera un numero casuale da zero a max
        generateRndNumber(max) {
            return Math.floor(Math.random() * max);
        },

        // Ritorna gli ultimi accessi di ogni utente
        lastAccess(user) {
            return localStorage.getItem(user.name);
        },

        // Crea l'illusione di attesa nella ricezione di un messaggio
        isWriting(array) {
            let tempMessage = {
                date: "",
                message: "Sta scrivendo...",
                status: 'received',
                visible: true
            };
            let includes = false;
            this.contacts[this.selectIndex].messages.forEach(elem => {
                if(elem.message.includes("Sta scrivendo...")) {
                    includes = true;
                } 
            })
            if(includes === false){
                array.push(tempMessage);
            }        
        },

        // Audio di messaggio ricevuto
        audioReceived() {
            const receAudio = new Audio('audio/received.wav');
            if (this.visible.notice){
                return receAudio.play();
            }
        },

        // Audio di messaggio inviato
        audioSend() {
            const sentAudio = new Audio('audio/sent.wav');
            if (this.visible.notice){
                return sentAudio.play();
            }
        },

        // Determina l'ora esatta ogni volta che viene invocata
        dataNow() {
            return dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
        },

        // Esegue il refresh degli ultimi accessi di tutte le chat aperte
        refreshLastAccess() {
            this.contacts.forEach(elem => {
                localStorage.setItem(elem.name, elem.messages[elem.messages.length - 1].date);
            })
        },

        // Evita la creazione di messaggi d'attesa multipli
        clearIsWriting() {
            this.contacts[this.selectIndex].messages.forEach((elem, i) => {
                if(elem.message === "Sta scrivendo...") {
                    this.contacts[this.selectIndex].messages.splice(i, 1);
                }
            })
        },

        // Inserisce un'emoji nell'input di testo
        insertEmoji(emoji) {
            document.getElementById("input-text-message").value += emoji;
            this.textInputValue += emoji;
            document.getElementById("input-text-message").focus();
        },

        // Chiude la finestra emoji e di ricerca cliccando in un determinato punto
        closeEmoji() {
            this.visible.emoji = false;
            this.visible.searchChat = false;
            this.visible.searchMex = false;
            if(this.searchChat != ""){
                this.contacts[this.selectIndex].messages.forEach(elem => {
                    elem.visible = true;
                })
            }
            this.searchChat = "";
        },

        // Cerca messaggi specifici all'interno di una chat
        searchInChat() {
            let search = this.searchChat.toLowerCase().trim();
            this.contacts[this.selectIndex].messages.forEach(elem => {
                elem.visible = true;
                if (!elem.message.toLowerCase().includes(search)){
                    elem.visible = false;
                }
            })
        },

        // Apre la barra di ricerca delle chat con animazione
        openSearchMess() {
            if(this.visible.searchChat === false) {
                this.visible.searchMex = true;
                this.visible.searchChat = true;
            } else {
                this.visible.searchMex = false;
                setTimeout(() => {
                    this.visible.searchChat = false;
                },230);
            }
        }

    }
}).mount("#wrapper");
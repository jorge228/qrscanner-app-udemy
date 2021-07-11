export class Registration {
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;
        this.created = new Date();
        this.chooseType();
    }

    private chooseType() {

        const initText = this.text.substring(0, 4);

        switch (initText) {
            case 'http':
                this.type = 'http'
                this.icon = 'globe'
                break;
            case 'geo':
                this.type = 'geo'
                this.icon = 'pin'
                break;
            default:
                this.type = 'geo';
                this.icon = 'pin'
                break;
        }

    }

}
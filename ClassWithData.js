export class ClassWithData {
  constructor(voice) {
    this.voice = voice;
  }

  makeSound() {
    console.log("Making sound: " + this.voice);
  }

  setVoice(voice) {
    this.voice = voice;
  }
}

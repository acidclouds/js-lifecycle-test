export class ClassThatUsesAnotherClass {
  constructor(otherClass) {
    this.otherClass = otherClass;
  }

  useOtherClass() {
    this.otherClass.makeSound();
  }
}

class C {
  x = 0;
  y = 0;
}
console.log(typeof C);
const a = new C();
type T20 = InstanceType<typeof C>; // C
type r = InstanceType<typeof a>;

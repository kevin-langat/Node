async function hashingOperations() {
  const pass = '123456'
  const hashedPass = await Bun.password.hash(pass);
  console.log(hashedPass)

  const password = '123465'
  const isMatch = await Bun.password.verify(password, hashedPass)
  console.log(isMatch)

  const argon2HashExample = await Bun.password.hash(pass, {
    algorithm: "argon2id",
    memoryCost: 4,
    timeCost: 3

  })
  console.log(argon2HashExample)

  const bycryptHashExample = await Bun.password.hash(pass, {
    algorithm: 'bcrypt',
    cost: 20,
  })
  console.log(bycryptHashExample)
}
hashingOperations()
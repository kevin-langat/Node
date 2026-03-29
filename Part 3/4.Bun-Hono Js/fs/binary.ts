function binaryDataOperations() {
  const buf = new ArrayBuffer(8);
  console.log('Array buffer size', buf.byteLength)

  const dv = new DataView(buf)
  dv.setUint8(0, 3)
  dv.setUint16(1, 510)

  console.log(dv.getUint8(0));
  console.log(dv.getUint16(1))

  const uint8Array = new Uint8Array([0, 1, 2, 3, 4])
  console.log(uint8Array)

  const nodeBuffer = Buffer.from("Hola, eh donde eres?")
  console.log(nodeBuffer)

  const blob = new Blob(["<html>Hello, Como estas?</html/>"], { type: "text/html" })
  console.log(blob)
  console.log(blob.size, blob.type)

  const encoder = new TextEncoder()
  const encodedVal = encoder.encode("Hola Bun")
  console.log(encodedVal)

  const decoder = new TextDecoder()
  const decodedVal = decoder.decode(encodedVal)
  console.log(decodedVal)
}

binaryDataOperations()
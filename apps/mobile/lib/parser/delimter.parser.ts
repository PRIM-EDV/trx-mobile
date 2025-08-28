/**
 * DelimiterParser
 * - sammelt eingehende Binär-Chunks
 * - splittet bei einem Byte-Delimiter (Standard: 0x00 -> '\0')
 * - gibt alle vollständigen Frames als Uint8Array zurück; Rest bleibt im Buffer
 */
export class DelimiterParser {
  private buffer = new Uint8Array();
  private delimiter: Uint8Array;

  constructor(delimiter: number | Uint8Array = 0x00) {
    if (typeof delimiter === "number") {
      if (delimiter < 0 || delimiter > 255) throw new Error("Delimiter muss 0..255 sein");
      this.delimiter = new Uint8Array([delimiter]);
    } else {
      if (delimiter.length === 0) throw new Error("Delimiter darf nicht leer sein");
      this.delimiter = delimiter;
    }
  }

  /**
   * Füttert neue Daten in den Parser und liefert alle vollständigen Frames zurück.
   */
  feed(input: DataView | ArrayBuffer | Uint8Array): Uint8Array[] {
    const chunk = input instanceof Uint8Array
      ? input
      : input instanceof ArrayBuffer
        ? new Uint8Array(input)
        : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);

    // buffer = buffer || chunk -> effizient konkatenieren
    if (this.buffer.length === 0) {
      this.buffer = chunk.slice(); // kopieren, da 'chunk' evtl. flüchtig ist
    } else {
      const merged = new Uint8Array(this.buffer.length + chunk.length);
      merged.set(this.buffer, 0);
      merged.set(chunk, this.buffer.length);
      this.buffer = merged;
    }

    const frames: Uint8Array[] = [];
    const d = this.delimiter;
    let start = 0;

    // Suche nach Delimiter (unterstützt auch mehrere Bytes)
    for (let i = 0; i <= this.buffer.length - d.length; ) {
      let match = true;
      for (let k = 0; k < d.length; k++) {
        if (this.buffer[i + k] !== d[k]) { match = false; break; }
      }
      if (match) {
        // slice [start, i) ist ein vollständiger Frame
        frames.push(this.buffer.slice(start, i));
        i += d.length;
        start = i;
      } else {
        i++;
      }
    }

    // Rest (nicht vollständiger Frame) im Buffer behalten
    if (start > 0) {
      this.buffer = this.buffer.slice(start);
    }

    return frames;
  }

  /**
   * Optional: Frames direkt als Text dekodieren (z.B. UTF-8)
   */
  decodeFrames(frames: Uint8Array[], encoding: string = "utf-8"): string[] {
    const dec = new TextDecoder(encoding, { fatal: false });
    return frames.map(f => dec.decode(f));
  }

  /**
   * Optional: verbleibenden (unvollständigen) Rest holen/clearen
   */
  flush(): Uint8Array {
    const out = this.buffer;
    this.buffer = new Uint8Array(0);
    return out;
  }
}

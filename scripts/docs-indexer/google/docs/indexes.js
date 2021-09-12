class ContentPiece {
  constructor(_contentPiece, _prevPiece = {}) {
    this._contentPiece = _contentPiece;
    this._prevPiece = _prevPiece;

    this.heading = {
      id: this._getHeadingId(),
      content: this._getHeadingContent(),
    };
    this.content = this._getContent();
  }

  _getContent() {
    return (
      this._contentPiece.paragraph?.elements
        ?.map(textPiece => textPiece?.textRun?.content || '')
        .join('') || ''
    );
  }

  _getHeadingId() {
    return (
      this._contentPiece.paragraph?.paragraphStyle?.headingId ||
      this._prevPiece.heading?.id
    );
  }

  _getHeadingContent() {
    const headingId = this._getHeadingId();
    if (headingId && this._prevPiece.heading?.id === headingId) {
      return this._prevPiece.heading.content;
    }
    return this._getContent() || this._prevPiece.heading?.content;
  }
}

const last = arr => arr[arr.length - 1];

module.exports.extractParagraphs = doc =>
  doc.content.reduce((acc, contentPiece) => {
    const piece = new ContentPiece(contentPiece, last(acc));
    if (!piece.content.trim()) {
      return acc;
    }
    return acc.concat(piece);
  }, []);

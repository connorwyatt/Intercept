'use strict';

class MessagesHelper {
  convertValidationException(validationException) {
    let validationExceptionKeys = Object.keys(validationException.formattedErrors),
      messages = [];

    validationExceptionKeys.forEach((field) => {
      let fieldErrors = validationException.formattedErrors[field];

      fieldErrors.forEach((message) => {
        messages.push({
          body: message,
          field: field
        });
      });
    });

    return messages;
  }
}

module.exports = new MessagesHelper();

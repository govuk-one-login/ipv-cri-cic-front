const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class DateOfBirthController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.dateOfBirth = req.sessionModel.get("dateOfBirth");
      console.log(req.form.values)
      callback(err, locals);
    });
  }

    next() {
      return "/checkDetails"
    } 
}
module.exports = DateOfBirthController; 

// {
//   'registered-models': [ 'hmpo-wizard-cri-cic-front' ],
//   history: [
//     {
//       path: '/',
//       next: '/landingPage',
//       wizard: 'cri-cic-front',
//       skip: true
//     },
//     {
//       path: '/landingPage',
//       next: '/photoIdSelection',
//       wizard: 'cri-cic-front'
//     },
//     {
//       path: '/photoIdSelection',
//       next: '/passportDetails',
//       fields: [Array],
//       formFields: [Array],
//       wizard: 'cri-cic-front'
//     },
//     {
//       path: '/passportDetails',
//       next: '/nameEntry',
//       fields: [Array],
//       formFields: [Array],
//       wizard: 'cri-cic-front'
//     },
//     {
//       path: '/nameEntry',
//       next: '/dateOfBirth',
//       fields: [Array],
//       formFields: [Array],
//       wizard: 'cri-cic-front'
//     }
//   ],
//   lastVisited: '/nameEntry',
//   passportExpiryDate: '2025-03-31',
//   surname: 'F',
//   firstName: 'G',
//   middleName: ''
// }
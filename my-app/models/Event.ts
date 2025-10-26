import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this event.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  artist: {
    type: String,
    required: [true, 'Please provide an artist for this event.'],
    maxlength: [60, 'Artist cannot be more than 60 characters'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date for this event.'],
  },
  time: {
    eventStartTime: {
      type: String,
      required: [true, 'Please provide an event start time for this event.'],
    },
    doorsOpenTime: {
      type: String,
      required: [true, 'Please provide a doors open time for this event.'],
    },
  },
  location: {
    type: String,
    required: [true, 'Please provide a location for this event.'],
  },
  venue: {
    type: String,
    required: [true, 'Please provide a venue for this event.'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL for this event.'],
  },
  priceFrom: {
    type: Number,
  },
  tickets: [
    {
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: String,
      },
    },
  ],
  tags: {
    type: [String],
  },
  currency: {
    type: String,
    default: 'SAR', // Default to SAR as used in the frontend
  },
  contactInfo: {
    customerServiceNumber: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export default Event;
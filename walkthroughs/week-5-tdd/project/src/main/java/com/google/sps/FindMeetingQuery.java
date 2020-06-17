// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.HashSet;
import java.util.ArrayList;

public final class FindMeetingQuery {

    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

        Collection<TimeRange> optional_attendees = new ArrayList<>();
        Collection<TimeRange> mandatory_attendees = new ArrayList<>();
        optional_attendees.add(TimeRange.WHOLE_DAY);
        mandatory_attendees.add(TimeRange.WHOLE_DAY);

        int minutesInDay = 24 * 60;
        if (request.getDuration() > minutesInDay)
            return new ArrayList<TimeRange>();
        

        Collection<String> allAttendees = new ArrayList<>();
        allAttendees.addAll(request.getAttendees());
        allAttendees.addAll(request.getOptionalAttendees());
        for (Event event : events) {
            if (attendeeAvailability(request.getAttendees(), event))
            {
                mandatory_attendees = availableTimes(mandatory_attendees, event, request.getDuration());
            }
            if (attendeeAvailability(allAttendees, event))
            {
                optional_attendees = availableTimes(optional_attendees, event, request.getDuration());
            }
        }

        if (request.getAttendees().isEmpty() || !optional_attendees.isEmpty())
            return optional_attendees;
        else {
            return mandatory_attendees;
        }
    }

    // method to check if attendee is available (true = avaliable ; false = not avaliable) 
    public boolean attendeeAvailability(Collection<String> attendees, Event event) {
        for (String attendee : attendees) {
            if (event.getAttendees().contains(attendee))
                return true;
        }
        return false;
    }


    // available time slots before and after a meeting 
    public Collection<TimeRange> availableTimes(Collection<TimeRange> availabilities, Event event, long requestDuration) {
        TimeRange eventTime = event.getWhen();
        Collection<TimeRange> availableSlots = new ArrayList<>();
        for (TimeRange time : availabilities) {
            if (time.overlaps(eventTime)) {
                // before 
                if (time.start() < eventTime.start() && eventTime.start() - time.start() >= requestDuration) 
                {
                    int duration = eventTime.start() - time.start();
                    availableSlots.add(TimeRange.fromStartDuration(time.start(), duration));
                }
                // after
                if (eventTime.end() < time.end() && time.end() - eventTime.end() >= requestDuration) 
                {
                    int duration = time.end() - eventTime.end();
                    availableSlots.add(TimeRange.fromStartDuration(eventTime.end(), duration));
                }
            } else {
                availableSlots.add(time);
            }
        }
        return availableSlots;
    }

}

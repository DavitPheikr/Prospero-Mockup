import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:cooperative_x/models/event.dart';

/// Calendar‑centric replacement for the previous table view.
///
/// * Shows a monthly calendar with orange dots on days containing events.
/// * Selecting a day lists its events directly below the calendar.
/// * Tapping an event still invokes [onOpenEvent] so the existing dialog works.
class EventsPage extends StatefulWidget {
  const EventsPage({
    super.key,
    required this.events,
    required this.onOpenEvent,
  });

  final List<Event> events;
  final void Function(Event) onOpenEvent;

  @override
  State<EventsPage> createState() => _EventsPageState();
}

class _EventsPageState extends State<EventsPage> {
  /// Map of yyyy‑mm‑dd → events on that day (UTC keys for safe comparison).
  late final Map<DateTime, List<Event>> _eventsByDay;

  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  @override
  void initState() {
    super.initState();

    _eventsByDay = {};
    for (final e in widget.events) {
      final key = DateTime.utc(e.date.year, e.date.month, e.date.day);
      _eventsByDay.putIfAbsent(key, () => []).add(e);
    }

    _selectedDay = DateTime.utc(
      _focusedDay.year,
      _focusedDay.month,
      _focusedDay.day,
    );
  }

  List<Event> _getEventsForDay(DateTime day) {
    final key = DateTime.utc(day.year, day.month, day.day);
    return _eventsByDay[key] ?? const <Event>[];
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ─────────────────  PAGE TITLE  ─────────────────
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              'Events',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: Color(0xFF455A64),
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),

        // ─────────────────  CARD  ─────────────────
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 1,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  // ────────────────  CALENDAR  ────────────────
                  TableCalendar<Event>(
                    firstDay: DateTime.utc(2020, 1, 1),
                    lastDay: DateTime.utc(2030, 12, 31),
                    focusedDay: _focusedDay,
                    eventLoader: _getEventsForDay,
                    selectedDayPredicate: (d) => isSameDay(d, _selectedDay),
                    onDaySelected: (selected, focused) {
                      setState(() {
                        _selectedDay = selected;
                        _focusedDay = focused;
                      });
                    },
                    calendarStyle: const CalendarStyle(
                      markerDecoration: BoxDecoration(
                        color: Colors.orangeAccent,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // ────────────────  EVENTS LIST  ────────────────
                  Expanded(
                    child: Builder(
                      builder: (_) {
                        final events = _getEventsForDay(_selectedDay!);
                        if (events.isEmpty) {
                          return const Center(
                            child: Text('No events on this day'),
                          );
                        }
                        return ListView.separated(
                          itemCount: events.length,
                          separatorBuilder: (_, __) =>
                              const SizedBox(height: 8),
                          itemBuilder: (context, index) {
                            final e = events[index];
                            return ListTile(
                              tileColor: const Color(0xFFF7F7F7),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                              title: Text(e.title),
                              subtitle: Text(e.participants.join(', ')),
                              onTap: () => widget.onOpenEvent(e),
                            );
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

import 'package:cooperative_x/components/gradient_button.dart';
import 'package:cooperative_x/models/event.dart';
import 'package:flutter/material.dart';

class EventsPage extends StatelessWidget {
  final List<Event> events;
  final VoidCallback onCreateEvent;
  final void Function(Event) onOpenEvent;

  const EventsPage({
    super.key,
    required this.events,
    required this.onCreateEvent,
    required this.onOpenEvent,
  });

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();

    String fmt(DateTime d) =>
        '${d.day.toString().padLeft(2, '0')}.${d.month.toString().padLeft(2, '0')}.${d.year}';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Events',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: Color(0xFF455A64),
              ),
            ),
            GradientButton(text: 'Create Event', onTap: onCreateEvent),
          ],
        ),
        const SizedBox(height: 24),
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withValues(alpha: 0.5),
                  spreadRadius: 1,
                  blurRadius: 7,
                  offset: Offset(0, 3), // changes position of shadow
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.only(
                left: 16.0,
                top: 24.0,
                bottom: 24.0,
                right: 16.0,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 24.0),
                    child: Text(
                      'All events',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF455A64),
                      ),
                    ),
                  ),
                  SingleChildScrollView(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        minWidth: MediaQuery.of(context).size.width,
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: DataTable(
                          showCheckboxColumn: false,
                          border: TableBorder.all(
                            width: 1,
                            color: Color(0xFFBDBDBD),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          headingRowColor: WidgetStateProperty.all(
                            Color(0xFF5392cc),
                          ),
                          headingTextStyle: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                          horizontalMargin: 16,
                          columnSpacing: 32,
                          columns: const [
                            DataColumn(
                                label: Center(child: Text('No')),
                                numeric: false),
                            DataColumn(label: Text('Title')),
                            DataColumn(label: Text('Date')),
                            DataColumn(label: Text('Participants')),
                          ],
                          rows: List.generate(
                            events.length,
                            (i) {
                              final e = events[i];
                              final bool isEven = i.isEven;

                              return DataRow(
                                onSelectChanged: (value) {
                                  onOpenEvent(e);
                                },
                                color: WidgetStateProperty.resolveWith<Color?>(
                                  (states) {
                                    if (states.contains(WidgetState.selected)) {
                                      return Theme.of(context)
                                          .colorScheme
                                          .primary
                                          .withOpacity(0.08);
                                    }
                                    return isEven
                                        ? Colors.white
                                        : const Color(0xFFF7F7F7);
                                  },
                                ),
                                cells: [
                                  DataCell(Text('${i + 1}')),
                                  DataCell(Text(e.title)),
                                  DataCell(
                                    Text(
                                      fmt(e.date),
                                      style: TextStyle(
                                        color: DateTime(e.date.year,
                                                    e.date.month, e.date.day)
                                                .isBefore(now)
                                            ? Colors.red // past
                                            : Colors.green, // today or future
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Wrap(
                                      spacing: 8, // gap between chips
                                      runSpacing: 8, // gap between lines
                                      children: [
                                        for (final name in e.participants)
                                          FilterChip(
                                            label: Text(name),
                                            onSelected: (_) {},
                                            showCheckmark: false,
                                          ),
                                      ],
                                    ),
                                  )
                                ],
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(child: Container()),
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 24.0,
                      bottom: 16.0,
                    ),
                    child: Text(
                      'Showing ${events.length} results',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF455A64),
                      ),
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

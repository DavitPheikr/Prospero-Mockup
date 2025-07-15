import 'package:flutter/material.dart';
import '../models/event.dart';
import '../components/gradient_button.dart';

class EventDetailsDialog extends StatefulWidget {
  const EventDetailsDialog({super.key, required this.event});
  final Event event;

  @override
  State<EventDetailsDialog> createState() => _EventDetailsDialogState();
}

class _EventDetailsDialogState extends State<EventDetailsDialog> {
  late final Map<String, bool> _attendance;
  late final TextEditingController _notesCtrl;

  @override
  void initState() {
    super.initState();
    _attendance = {for (final p in widget.event.participants) p: false};
    _notesCtrl = TextEditingController(
        text: 'Talked about principles of saving up money');
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      insetPadding: const EdgeInsets.all(32),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: SizedBox(
        width: 900,
        height: 650,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                top: 32.0,
                bottom: 32.0,
                left: 32.0,
                right: 48.0,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.event.title,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF094B9C),
                        ),
                  ),
                  Text('Date: ${_fmt(widget.event.date)}'),
                ],
              ),
            ),
            Divider(
              height: 1,
              color: Color.fromRGBO(229, 231, 235, 0.8),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(
                  left: 32.0,
                  right: 32.0,
                  bottom: 24.0,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 24),
                    Text('Participants',
                        style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: _attendance.keys
                          .map((name) => FilterChip(
                                label: Text(name),
                                selected: _attendance[name]!,
                                onSelected: (v) {},
                              ))
                          .toList(),
                    ),
                    const SizedBox(height: 24),
                    Text('Notes / What was discussed',
                        style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 8),
                    Expanded(
                      child: TextField(
                        textAlignVertical: TextAlignVertical.top,
                        controller: _notesCtrl,
                        maxLines: null,
                        expands: true,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          filled: true,
                          fillColor: Color(0xFFF5F8FC),
                        ),
                        readOnly: true,
                      ),
                    ),
                    SizedBox(
                      height: 18,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _fmt(DateTime d) =>
      '${d.day.toString().padLeft(2, '0')}.${d.month.toString().padLeft(2, '0')}.${d.year}';
}

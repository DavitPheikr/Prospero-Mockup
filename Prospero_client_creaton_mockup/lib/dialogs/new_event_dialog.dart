import 'package:flutter/material.dart';
import '../models/event.dart';
import '../components/gradient_button.dart';

class NewEventDialog extends StatefulWidget {
  const NewEventDialog({super.key});

  @override
  State<NewEventDialog> createState() => _NewEventDialogState();
}

class _NewEventDialogState extends State<NewEventDialog> {
  late final Map<String, bool> _attendance;

  final TextEditingController _notesCtrl = TextEditingController();
  final TextEditingController _titleCtrl = TextEditingController();
  final TextEditingController _dateCtrl = TextEditingController();

  @override
  void initState() {
    final _participants = {
      'Andrei Popescu',
      'Cristian Mihai',
      'Calin Georgescu',
      'Nicusor Dan',
    };
    _attendance = {for (final p in _participants) p: false};
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      insetPadding: const EdgeInsets.all(32),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: SizedBox(
        width: 700,
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
                    'Create new event',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF094B9C),
                        ),
                  ),
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
                    SizedBox(
                      width: 300,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 24),
                          Text('Title',
                              style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _titleCtrl,
                            maxLines: 1,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              filled: true,
                              fillColor: Color(0xFFF5F8FC),
                            ),
                          ),
                          const SizedBox(height: 12),
                          Text('Date',
                              style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _dateCtrl,
                            maxLines: 1,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              filled: true,
                              fillColor: Color(0xFFF5F8FC),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text('Participants',
                        style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: _attendance.keys
                          .map((name) => FilterChip(
                                label: Text(name),
                                selected: _attendance[name]!,
                                onSelected: (v) =>
                                    setState(() => _attendance[name] = v),
                              ))
                          .toList(),
                    ),
                    const SizedBox(height: 24),
                    Text('Description',
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
                      ),
                    ),
                    SizedBox(
                      height: 18,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        GradientButton(
                          text: 'Save',
                          onTap: () {
                            Navigator.pop(context);
                          },
                        ),
                      ],
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

import 'package:cooperative_x/pages/homescreen/events.dart';
import 'package:flutter/material.dart';
import '../../models/client.dart';
import '../../models/event.dart';
import '../../dialogs/event_details_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

enum Section { events }

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Event> _events = [
    Event(
      title: 'How to organize your money?',
      date: DateTime(2025, 7, 10),
      participants: ['Andrei Darius', 'Pavel Cristian'],
    ),
    Event(
      title: 'How to make more money?',
      date: DateTime(2025, 7, 14),
      participants: ['Andrei Darius'],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFEBEFF1),
      body: Column(
        children: [
          Container(
            height: 64,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Color(0xFF24425B),
                  Color(0xFF6288C9),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 32.0, bottom: 3),
                  child: Text(
                    'Coorporative X',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Expanded(
                  child: Container(),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 32.0, bottom: 3),
                  child: Text(
                    'Welcome, Andrei Darius',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Divider(
            thickness: 6,
            color: Colors.orangeAccent,
            height: 1,
          ),
          Expanded(
            child: Row(
              children: [
                // ───────────────────  SIDE-BAR  ───────────────────
                Container(
                  width: 220, // wide enough for the label
                  color: Colors.white, // rail background
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: List.generate(1, (index) {
                      // destination data
                      final iconData = [Icons.event][index];
                      final label = ['Events'][index];
                      final selected = index == _selectedIndex;

                      return InkWell(
                        onTap: () => setState(() {
                          _selectedIndex = index;
                        }),
                        child: Container(
                          height: 48, // rail row height
                          decoration: selected
                              ? const BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [
                                      Color(0xFF24425B),
                                      Color(0xFF6288C9)
                                    ],
                                  ),
                                )
                              : null, // only paint gradient when selected
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Row(
                            children: [
                              // square icon slot
                              Container(
                                width: 32,
                                height: 32,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: selected
                                      ? Colors
                                          .transparent // let gradient show through
                                      : const Color(0xFFF1F3F6),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Icon(
                                  iconData,
                                  size: 20,
                                  color: selected
                                      ? Colors.white
                                      : const Color(0xFF7E7E7E),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Text(
                                label,
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w500,
                                  color: selected
                                      ? Colors.white
                                      : const Color(0xFF7E7E7E),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                  ),
                ),

                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: EventsPage(
                      events: _events,
                      onOpenEvent: _openEvent,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _openEvent(Event e) {
    showDialog(
      context: context,
      builder: (_) => EventDetailsDialog(event: e),
    );
  }
}

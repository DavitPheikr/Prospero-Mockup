import 'package:cooperative_x/dialogs/new_event_dialog.dart';
import 'package:cooperative_x/pages/homescreen/clients.dart';
import 'package:cooperative_x/pages/homescreen/events.dart';
import 'package:flutter/material.dart';
import '../../models/client.dart';
import '../../models/event.dart';
import '../../dialogs/register_dialog.dart';
import '../../dialogs/event_details_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

enum Section { clients, events }

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Client> _clients = [
    Client(name: 'Mihai Alexandru', loanAmount: 1200, loanPurpose: 'Tractor'),
    Client(
        name: 'Popescu Cristian', loanAmount: 6000, loanPurpose: 'BMW seria 5'),
  ];

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
                    children: List.generate(2, (index) {
                      // destination data
                      final iconData = [Icons.people, Icons.event][index];
                      final label = ['Clients', 'Events'][index];
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
                    child: _selectedIndex == 0
                        ? ClientsPage(
                            clients: _clients,
                            onCreateClient: _showRegisterWizard,
                          )
                        : EventsPage(
                            events: _events,
                            onCreateEvent: _createEvent,
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

  // Helpers
  void _showRegisterWizard() {
    showDialog(
      context: context,
      builder: (_) => const RegisterWizardDialog(),
    );
  }

  void _createEvent() {
    showDialog(
      context: context,
      builder: (_) => const NewEventDialog(),
    );
  }

  void _openEvent(Event e) {
    showDialog(
      context: context,
      builder: (_) => EventDetailsDialog(event: e),
    );
  }
}

import 'package:cooperative_x/pages/homescreen/events.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:html' as html;
import '../../models/client.dart';
import '../../models/event.dart';
import '../../dialogs/event_details_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

enum Section { account, statistics, transactions, loans, events }

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 4; // Start with Events selected

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

  final List<Map<String, dynamic>> _navigationItems = [
    {'icon': Icons.person, 'label': 'Account', 'url': 'http://localhost:3000/account'},
    {'icon': Icons.bar_chart, 'label': 'Statistics', 'url': 'http://localhost:3000/statistics'},
    {'icon': Icons.repeat, 'label': 'Transactions', 'url': 'http://localhost:3000/transactions'},
    {'icon': Icons.account_balance_wallet, 'label': 'Loans', 'url': 'http://localhost:3000/loans'},
    {'icon': Icons.event, 'label': 'Events', 'url': null}, // Events stays in Flutter
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
                    children: [
                      // Navbar Header with Title
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [Color(0xFF24425B), Color(0xFF6288C9)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          border: Border(
                            bottom: BorderSide(color: Color(0xFFE0E0E0), width: 1),
                          ),
                        ),
                        child: Text(
                          'Member Portal',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0.5,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      // Navigation Items
                      ...List.generate(_navigationItems.length, (index) {
                        final item = _navigationItems[index];
                        final selected = index == _selectedIndex;

                        return InkWell(
                          onTap: () => _handleNavigation(index, item['url']),
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
                                    item['icon'],
                                    size: 20,
                                    color: selected
                                        ? Colors.white
                                        : const Color(0xFF7E7E7E),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Text(
                                  item['label'],
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
                    ],
                  ),
                ),

                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: _selectedIndex == 4 ? EventsPage(
                      events: _events,
                      onOpenEvent: _openEvent,
                    ) : Container(
                      child: Center(
                        child: Text(
                          'Loading ${_navigationItems[_selectedIndex]['label']}...',
                          style: TextStyle(fontSize: 18, color: Colors.grey),
                        ),
                      ),
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

  void _handleNavigation(int index, String? url) {
    if (url != null) {
      // Navigate to Next.js page
      _launchURL(url);
    } else {
      // Stay in Flutter app (Events page)
      setState(() {
        _selectedIndex = index;
      });
    }
  }

  void _launchURL(String url) async {
    if (kIsWeb) {
      html.window.location.href = url;
    } else {
      final Uri uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        throw 'Could not launch $url';
      }
    }
  }

  void _openEvent(Event e) {
    showDialog(
      context: context,
      builder: (_) => EventDetailsDialog(event: e),
    );
  }
}

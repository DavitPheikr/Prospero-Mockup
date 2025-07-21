import 'package:cooperative_x/dialogs/new_event_dialog.dart';
import 'package:cooperative_x/pages/homescreen/clients.dart';
import 'package:cooperative_x/pages/homescreen/events.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'dart:html' as html;
import '../../models/client.dart';
import '../../models/event.dart';
import '../../dialogs/register_dialog.dart';
import '../../dialogs/event_details_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

enum Section { openLoans, loanRequests, tambahMember, balanceSheet, profitLoss, shuDistribution, shuReport, sikpOjk, transactionJournal, memberDetails, clients, events }

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 2; // Start with Tambah Member selected (index 2)

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

  final List<Map<String, dynamic>> _navigationItems = [
    {'icon': Icons.list_alt, 'label': 'Open Loans', 'url': 'http://localhost:3000/employee/open-loans'},
    {'icon': Icons.description, 'label': 'Loan Requests', 'url': 'http://localhost:3000/employee/loan-requests'},
    {'icon': Icons.person_add, 'label': 'Tambah Member', 'url': null}, // Current app - Clients
    {'icon': Icons.event_note, 'label': 'Tambah Events', 'url': null}, // Current app - Events
    {'icon': Icons.security, 'label': 'Risk Management', 'url': 'http://208.87.132.115:32771', 'newWindow': true},
    {'icon': Icons.book, 'label': 'Balance Sheet', 'url': 'http://localhost:3000/employee/raport/balance-sheet'},
    {'icon': Icons.description, 'label': 'Profit & Loss', 'url': 'http://localhost:3000/employee/raport/profit-loss'},
    {'icon': Icons.people, 'label': 'SHU Distribution', 'url': 'http://localhost:3000/employee/raport/shu-distribution'},
    {'icon': Icons.pie_chart, 'label': 'SHU Report', 'url': 'http://localhost:3000/employee/raport/shu-report'},
    {'icon': Icons.assignment, 'label': 'SIKP OJK Reports', 'url': 'http://localhost:3000/employee/raport/sikp-ojk-reports'},
    {'icon': Icons.list, 'label': 'Transaction Journal', 'url': 'http://localhost:3000/employee/raport/transaction-journal'},
    {'icon': Icons.account_balance_wallet, 'label': 'Member Details', 'url': 'http://localhost:3000/employee/member-transactions'},
  ];

  @override
  void initState() {
    super.initState();
    _checkUrlFragment();
  }

  void _checkUrlFragment() {
    if (kIsWeb) {
      final fragment = html.window.location.hash;
      if (fragment == '#events') {
        setState(() {
          _selectedIndex = 3; // Tambah Events
        });
      } else if (fragment == '#members') {
        setState(() {
          _selectedIndex = 2; // Tambah Member
        });
      }
    }
  }

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
                  width: 260, // increased width for longer labels
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
                          'Cooperative Employee',
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
                                Expanded(
                                  child: Text(
                                    item['label'],
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500,
                                      color: selected
                                          ? Colors.white
                                          : const Color(0xFF7E7E7E),
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                    maxLines: 1,
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
                    child: _selectedIndex == 2 ? ClientsPage(
                      clients: _clients,
                      onCreateClient: _showRegisterWizard,
                    ) : _selectedIndex == 3 ? EventsPage(
                      events: _events,
                      onCreateEvent: _createEvent,
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
      // Navigate to external page
      final item = _navigationItems[index];
      final openInNewWindow = item['newWindow'] ?? false;
      _launchURL(url, openInNewWindow);
    } else {
      // Stay in Flutter app (Tambah Member or Tambah Events page)
      setState(() {
        _selectedIndex = index;
      });
    }
  }

  void _launchURL(String url, [bool openInNewWindow = false]) {
    if (kIsWeb) {
      if (openInNewWindow) {
        html.window.open(url, '_blank');
      } else {
        html.window.location.href = url;
      }
    }
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
